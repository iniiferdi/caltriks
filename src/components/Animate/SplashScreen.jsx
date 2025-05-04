import { motion, AnimatePresence } from "framer-motion";

export function SplachScreen({showSplash}){
    return(
        <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
            }}
            className="fixed inset-0 bg-black text-white flex items-center justify-center z-50"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, duration: 1.5, ease: "easeOut" },
              }}
              exit={{ opacity: 0, y: -30 }}
              className="text-5xl font-extrabold tracking-wider"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.5, duration: 1, ease: "easeInOut" },
                }}
              >
                C
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.6, duration: 1, ease: "easeInOut" },
                }}
              >
                a
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.7, duration: 1, ease: "easeInOut" },
                }}
              >
                l
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.8, duration: 1, ease: "easeInOut" },
                }}
              >
                t
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.9, duration: 1, ease: "easeInOut" },
                }}
              >
                r
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 1, duration: 1, ease: "easeInOut" },
                }}
              >
                i
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 1.1, duration: 1, ease: "easeInOut" },
                }}
              >
                k
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 1.2, duration: 1, ease: "easeInOut" },
                }}
              >
                s
              </motion.span>
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    )
}