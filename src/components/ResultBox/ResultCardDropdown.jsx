import { MoreVertical, ArrowRightLeft, MoveRight, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DropdownMenu({ onUseAsA, onUseAsB, onDelete }) {
  return (
    <div className="group absolute top-4 right-4 z-10">
      <div className="p-1 rounded hover:bg-white/10 transition">
        <MoreVertical className="w-5 h-5 text-white" />
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="invisible group-hover:visible group-hover:opacity-100 opacity-0 transition-all absolute right-0 mt-2 w-48 bg-white/5 backdrop-blur-lg border border-neutral-800 rounded-lg shadow-md overflow-hidden text-xs text-white"
        >
          <button
            onClick={onUseAsA}
            className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-white/10 transition"
          >
            <ArrowRightLeft className="w-4 h-4 opacity-70" />
            Use as Matrix A
          </button>
          <button
            onClick={onUseAsB}
            className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-white/10 transition"
          >
            <MoveRight className="w-4 h-4 opacity-70" />
            Use as Matrix B
          </button>
          <button
            onClick={onDelete}
            className="w-full px-3 py-2 text-left flex items-center gap-2 text-red-400 hover:bg-white/10 transition"
          >
            <Trash2 className="w-4 h-4 opacity-70" />
            Delete Result
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
