import { motion } from "framer-motion";

export const EmptyResult = () => (
  <motion.div
    key="empty"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="bg-[rgba(128,120,120,0.03)] backdrop-blur-[118.2px] rounded-xl p-6 border-2 border-[#1E1E20] shadow-inner text-center"
  >
    <p className="text-gray-400 text-sm">No matrix operations have been performed yet.</p>
    <p className="text-gray-500 text-xs mt-1">
      Try adding operations such as addition, transpose, determinant, or inverse.
    </p>
  </motion.div>
);
