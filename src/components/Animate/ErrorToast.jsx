import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export const ErrorToast = ({ errorType, errorMessage }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.3 }}
    className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 inline-block max-w-[90%] sm:max-w-xl bg-[#121212] shadow-[rgba(0,0,0,0.25)] border border-[#1E1E20] text-white rounded-lg shadow-lg p-3"
  >
    <div className="flex items-start gap-2">
      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-1">
          <h2 className="font-semibold text-sm text-white">{errorType || "Error"}:</h2>
          <p className="text-sm text-gray-300">{errorMessage}</p>
        </div>
      </div>
    </div>
    <motion.div
      className="h-[3px] bg-white rounded-full mt-2"
      initial={{ width: "100%" }}
      animate={{ width: 0 }}
      transition={{ duration: 3, ease: "linear" }}
    />
  </motion.div>
);
