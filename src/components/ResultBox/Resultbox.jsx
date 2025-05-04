'use client';

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { ResultCard } from "./ResultCard";
import { EmptyResult } from "./EmpetyResult";

export function ResultBox({ history, onClear, onUseAsA, onUseAsB, onDelete }) {
  const isEmpty = history.length === 0;
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isEmpty && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  return (
    <div className="w-full max-w-5xl mt-18 space-y-6" ref={containerRef}>
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

      <div className="max-h-[600px] overflow-y-auto w-full space-y-6 pr-1 scroll-smooth">
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
