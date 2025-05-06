import { useState, useRef } from "react";
import Tesseract from "tesseract.js";

export function useOCRMatrix({ setIsLoading, onMatrixExtracted }) {
  const canvasRef = useRef(null);
  const [error, setError] = useState("");

  const processImage = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");

          const maxWidth = 800;
          const scale = Math.min(maxWidth / img.width, 1);
          const newWidth = img.width * scale;
          const newHeight = img.height * scale;

          canvas.width = newWidth;
          canvas.height = newHeight;

          // Draw original image to canvas
          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          // Grayscale + thresholding
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
            const value = gray > 150 ? 255 : 0;
            data[i] = data[i + 1] = data[i + 2] = value;
          }

          ctx.putImageData(imageData, 0, 0);
          const base64Image = canvas.toDataURL();
          resolve(base64Image);
        };
      };
      reader.readAsDataURL(imageFile);
    });
  };

  const recognizeMatrix = async (imageFile) => {
    setError("");
    setIsLoading(true);
    try {
      const base64Image = await processImage(imageFile);

      const result = await Tesseract.recognize(base64Image, "eng", {
        tessedit_char_whitelist: "0123456789-",
        tessedit_pageseg_mode: 6,
        oem: 3,
        logger: (m) => console.log("OCR:", m),
      });

      const text = result.data.text;
      console.log("OCR Result (raw):", text);

      const cleanedText = normalizeOCRText(text);
      console.log("Cleaned OCR:", cleanedText);

      const matrix = cleanedText
        .split("\n")
        .map((line) =>
          line
            .trim()
            .split(/\s+/)
            .filter((t) => /^-?\d+$/.test(t))
            .map(Number)
        )
        .filter((row) => row.length > 0);

      if (matrix.length === 0) {
        setError("Tidak ditemukan angka dalam gambar.");
      } else {
        onMatrixExtracted(matrix);
      }
    } catch (err) {
      console.error("OCR error:", err);
      setError("OCR gagal.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    recognizeMatrix,
    canvasRef,
    error,
  };
}

function normalizeOCRText(text) {
  return text
    .replace(/[oO]/g, "0")
    .replace(/[^\d\-\s\n]/g, "")
    .replace(/(\d)\s+-(\d)/g, "$1 -$2")
    .replace(/[ ]+/g, " ")
    .replace(/^[ \t]+|[ \t]+$/gm, "")
    .trim();
}

