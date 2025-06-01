import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { ExplainContent } from "./ExplainContent";

export function ExplainBox({ entry}) {
  const [showExplain, setShowExplain] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setShowExplain(prev => !prev)}
        className="px-3 py-1 bg-[#121212] border cursor-pointer text-sm border-[#1E1E20] flex items-center gap-1 text-white rounded-full transition"
      >
        <Lightbulb className="w-4 h-4" />
        {showExplain ? 'Hide' : 'Explain'}
      </button>
      {showExplain && <ExplainContent entry={entry} />}
    </div>
  );
}
