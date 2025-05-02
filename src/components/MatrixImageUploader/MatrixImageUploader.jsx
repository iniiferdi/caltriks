"use client";

import { useRef, useState } from "react";
import Tesseract from "tesseract.js";

export function MatrixImageUploader({ onMatrixExtracted, setIsLoading }) {
  const fileInputRef = useRef();
  const canvasRef = useRef(null);
  const [error, setError] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    setError("");
    setIsImageUploaded(false);

    if (!file || !file.type.startsWith("image/")) {
      setError("File tidak valid. Harap unggah gambar.");
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        setIsImageUploaded(true);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        const maxWidth = 800;
        const scale = Math.min(maxWidth / img.width, 1);
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
          const value = gray > 150 ? 255 : 0;
          data[i] = data[i + 1] = data[i + 2] = value;
        }

        ctx.putImageData(imageData, 0, 0);
        const base64Image = canvas.toDataURL();

        Tesseract.recognize(base64Image, "eng", {
          tessedit_char_whitelist: "0123456789",
          tessedit_pageseg_mode: 6,
          oem: 3,
          preserve_interword_spaces: true,
          logger: (m) => console.log("OCR:", m),
        })
          .then(({ data: { text } }) => {
            console.log("OCR Result:", text);

            const matrix = processOCRResult(text);

            if (matrix.length === 0) {
              setError("Tidak ditemukan angka dalam gambar.");
            } else {
              onMatrixExtracted(matrix);
            }
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Tesseract error:", err);
            setError("OCR gagal.");
            setIsLoading(false);
          });
      };
    };

    reader.readAsDataURL(file);
  };

  const processOCRResult = (text) => {
    const matrix = text
      .split("\n")
      .map((line) =>
        line
          .trim()
          .split(/\s+/)
          .filter((t) => /^\d+$/.test(t))
          .map(Number)
      )
      .filter((row) => row.length > 0);

    return matrix;
  };

  return (
    <div className="relative">
      <button
        onClick={handleUploadClick}
        className="absolute cursor-pointer top-[-64px] right-[-44px] mt-2 mr-2 bg-[#333] hover:bg-[#555] text-white p-2 rounded-full shadow-lg transition-all z-10"
        title="Upload Gambar"
      >
        <img src="/icons/camera.svg" alt="Upload matriks" className="w-4 h-4" />
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
