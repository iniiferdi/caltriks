import { motion, AnimatePresence } from "framer-motion";

export function IsLoading({ isLoading }) {
    return (
        <>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-white/10 text-white text-sm px-4 py-2 rounded-lg shadow-md backdrop-blur-sm"
                >
                    <span className="animate-pulse">Processing...</span>
                </motion.div>
            )}
        </>
    )
}