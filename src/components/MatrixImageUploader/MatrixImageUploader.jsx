import { useRef, useState } from "react";

export function MatrixImageUploader({ onMatrixExtracted }) {
  const fileInputRef = useRef();
  const [isProcessing, setIsProcessing] = useState(false);
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

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("apikey", "K83665041288957"); // Ganti dengan API key kamu
      formData.append("language", "eng");
      formData.append("isOverlayRequired", "false");
      formData.append("file", file);

      const res = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      const parsed = result?.ParsedResults?.[0]?.ParsedText;

      if (!parsed) {
        throw new Error("Tidak ada teks yang terdeteksi.");
      }

      console.log("Hasil mentah:", parsed);

      // Ubah hasil teks ke dalam bentuk matriks angka
      const matrix = parsed
        .split("\n")
        .map((line) => {
          const tokens = line
            .trim()
            .split(/[\s,]+/)
            .filter((token) => /^\d+$/.test(token));

          if (tokens.length === 1 && tokens[0].length > 1) {
            // Jika cuma satu angka panjang (misalnya 528), pecah ke digit
            return tokens[0].split("").map((digit) => parseInt(digit));
          }

          return tokens.map(Number);
        })
        .filter((row) => row.length > 0);

      if (matrix.length === 0) {
        setError("Tidak ditemukan angka dalam gambar.");
        setIsProcessing(false);
        return;
      }

      console.log("Matrix dari OCR.space:", matrix);
      onMatrixExtracted(matrix);
    } catch (err) {
      console.error("OCR.space error:", err);
      setError("Gagal memproses gambar dengan OCR.space.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleUploadClick}
        className="absolute cursor-pointer top-0 right-[-28px] mt-2 mr-2 bg-[#333] hover:bg-[#555] text-white p-2 rounded-full shadow-lg transition-all z-10"
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
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center text-white text-sm font-semibold z-20">
          Memproses gambar...
        </div>
      )}

      {error && (
        <div className="absolute bottom-[-1.5rem] left-0 text-red-500 text-xs">
          {error}
        </div>
      )}
    </div>
  );
}
