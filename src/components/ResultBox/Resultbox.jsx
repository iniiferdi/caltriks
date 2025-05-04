'use client';

import { AnimatePresence } from "framer-motion";
import { ResultCard } from "./ResultCard";
import { EmptyResult } from "./EmpetyResult";

export function ResultBox({ history, onClear, onUseAsA, onUseAsB, onDelete }) {
  const isEmpty = history.length === 0;

  return (
    <div className="w-full max-w-5xl mt-16 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold">Result</h2>
        <button
          className={`text-sm font-medium cursor-pointer hover:underline transition ${
            isEmpty ? "text-gray-500 cursor-not-allowed hover:no-underline" : "text-white"
          }`}
          onClick={() => !isEmpty && onClear()}
          disabled={isEmpty}
        >
          Clear All
        </button>
      </div>

      <div className="max-h-[600px] overflow-y-auto w-full space-y-6 pr-1">
        <AnimatePresence>
          {isEmpty ? (
            <EmptyResult />
          ) : (
            history.map((entry, i) => (
              <ResultCard
                key={i}
                index={i}
                entry={entry}
                onUseAsA={() => onUseAsA(entry.result)}
                onUseAsB={() => onUseAsB(entry.result)}
                onDelete={() => onDelete(i)}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
