"use client";
import { useRef, useState } from "react";
import { useOCRMatrix } from "@/hooks/useOCRMatrix";

export function MatrixImageUploader({ onMatrixExtracted, setIsLoading }) {
  const fileInputRef = useRef();
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const { recognizeMatrix, canvasRef, error } = useOCRMatrix({
    setIsLoading,
    onMatrixExtracted,
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    setIsImageUploaded(false);

    if (!file || !file.type.startsWith("image/")) {
      alert("File tidak valid. Harap unggah gambar.");
      return;
    }

    setIsImageUploaded(true);
    recognizeMatrix(file);
  };

  return (
    <div className="relative">
      <button
        onClick={handleUploadClick}
        className="absolute cursor-pointer top-[-64px] right-[-44px] mt-2 mr-2 bg-[#333] hover:bg-[#555] text-white p-2 rounded-full shadow-lg transition-all z-10"
        title="Upload Images"
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
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
