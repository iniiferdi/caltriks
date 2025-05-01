import { useRef, useState } from "react";
import Tesseract from "tesseract.js";

export function MatrixImageUploader({ onMatrixExtracted }) {
  const fileInputRef = useRef();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setIsProcessing(true);

    const { data } = await Tesseract.recognize(imageURL, "eng", {
      logger: (m) => console.log(m),
    });

    console.log("OCR result:", data.text);

    // Ambil semua angka dari hasil OCR
    const allNumbers = data.text.match(/\d/g)?.map(Number) || [];

    console.log("All digits:", allNumbers);

    if (allNumbers.length < 9) {
      console.error("Matriks tidak valid (butuh 9 angka)");
      setIsProcessing(false);
      return;
    }

    // Ambil 9 angka pertama dan bentuk matriks 3x3
    const sliced = allNumbers.slice(0, 9);
    const matrix = [
      sliced.slice(0, 3),
      sliced.slice(3, 6),
      sliced.slice(6, 9),
    ];

    console.log("Parsed matrix (3x3):", matrix);
    onMatrixExtracted(matrix);

    setIsProcessing(false);
  };

  return (
    <div>
      <button
        onClick={handleUploadClick}
        className="absolute cursor-pointer top-0 right-[-32px] mt-2 mr-2 bg-[#333] hover:bg-[#555] text-white p-2 rounded-full shadow-lg transition-all z-10"
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

      {isProcessing && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          Processing...
        </div>
      )}
    </div>
  );
}
