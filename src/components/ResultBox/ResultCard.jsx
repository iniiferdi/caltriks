import { motion } from "framer-motion";
import { useState } from "react";
import { MatrixRow } from './MatriksRow';
import { DropdownMenu } from './ResultCardDropdown';

export function ResultCard({ entry, index, onUseAsA, onUseAsB, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative bg-[rgba(128,120,120,0.03)] w-full backdrop-blur-[118.2px] rounded-xl p-4 border-2 border-[#1E1E20] shadow-inner"
    >
      <DropdownMenu
        open={open}
        setOpen={setOpen}
        onUseAsA={() => onUseAsA(entry.rawResult)}
        onUseAsB={() => onUseAsB(entry.rawResult)}
        onDelete={() => onDelete(index)}
      />
      <MatrixRow index={index} entry={entry} />
    </motion.div>
  );
}
