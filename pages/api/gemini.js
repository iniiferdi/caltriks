import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const extractJsonArray = (rawText) => {
  const cleaned = rawText.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");
  if (start === -1 || end === -1) throw new Error("JSON array not found.");

  let json = cleaned.slice(start, end + 1).replace(/,\s*([\]}])/g, "$1");
  return json;
};

const buildPrompt = (matrix, operation) => `
Saya memiliki matriks berikut:\n${JSON.stringify(matrix, null, 2)}.

Saya ingin melakukan operasi "${operation}" terhadap matriks tersebut.

Tolong jelaskan langkah-langkahnya dalam format JSON sebagai array dari objek langkah.

Setiap objek langkah harus memiliki struktur berikut:
{
  "title": "Judul langkah, misalnya: Langkah 1: Hitung Determinan",
  "description": "Penjelasan singkat dan jelas mengenai langkah ini.",
  "matrix": {
    "data": [[...], [...]], // matriks setelah langkah ini (jika ada), jika tidak ada isi null
    "rows": 3,
    "cols": 3
  }
}

Catatan:
- Jika tidak ada matriks pada suatu langkah, isi properti "matrix" dengan null.
- Gunakan bahasa Indonesia yang ringkas, profesional, dan tidak bertele-tele.
- Kembalikan hanya data JSON tanpa code block atau penjelasan tambahan.
- Fokus pada langkah-langkah penting dalam operasi matriks.
- Langkahnya harus runtut dari awal hingga akhir.
- Jangan ubah bentuk pecahan ke desimal. Biarkan seperti aslinya, misalnya: "2/3".
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { matrix, operation } = req.body;

  if (!matrix || !operation) {
    return res.status(400).json({ message: "Matrix dan operation wajib diisi." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = buildPrompt(matrix, operation);

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const rawText = await result.response.text();
    console.log("Gemini Raw Response:", rawText);

    try {
      const jsonString = extractJsonArray(rawText);
      const parsedSteps = JSON.parse(jsonString);
      return res.status(200).json({ steps: parsedSteps });
    } catch (jsonErr) {
      console.error("JSON Parsing Error:", jsonErr);
      return res.status(502).json({ message: "Gagal parsing data dari Gemini." });
    }

  } catch (err) {
    console.error("Gemini API Error:", err);
    return res.status(500).json({ message: "Gagal mengambil data dari Gemini." });
  }
}
