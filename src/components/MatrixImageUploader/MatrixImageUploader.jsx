import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function MatrixImageUploader({ onMatrixExtracted, setIsLoading }) {
  const fileInputRef = useRef();
  const [error, setError] = useState("");

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    setError("");

    if (!file || !file.type.startsWith("image/")) {
      setError("File tidak valid. Harap unggah gambar.");
      return;
    }


    setIsLoading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1];

        const formData = new FormData();
        formData.append("apikey", "K83665041288957");
        formData.append("language", "eng");
        formData.append("isOverlayRequired", "false");
        formData.append("base64Image", `data:${file.type};base64,${base64Image}`);

        const res = await fetch("https://api.ocr.space/parse/image", {
          method: "POST",
          body: formData,
        });

        const result = await res.json();
        const parsed = result?.ParsedResults?.[0]?.ParsedText?.trim();

        if (!parsed) {
          throw new Error("Tidak ada teks yang terdeteksi.");
        }

        console.log("Hasil mentah:", parsed);

        const matrix = parsed
          .split("\n")
          .map((line) => {
            const tokens = line
              .trim()
              .split(/[\s,]+/)
              .filter((token) => /^\d+$/.test(token));

            if (tokens.length === 1 && tokens[0].length > 1) {
              return tokens[0].split("").map((d) => parseInt(d));
            }

            return tokens.map(Number);
          })
          .filter((row) => row.length > 0);

        if (matrix.length === 0) {
          setError("Tidak ditemukan angka dalam gambar.");
          setIsLoading(false);
          return;
        }

        console.log("Matrix dari OCR.space:", matrix);
        onMatrixExtracted(matrix);
        setIsLoading(false);
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error("OCR.space error:", err);
      setError("Gagal memproses gambar dengan OCR.space.");
      setIsLoading(false);
    }
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

   




      {error && (
        <div className="absolute bottom-[-1.5rem] left-0 text-red-500 text-xs">
          {error}
        </div>
      )}
    </div>
  );
}
