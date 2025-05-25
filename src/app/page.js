'use client';

import { useRouter } from 'next/navigation';

import { AnimatePresence, motion } from "framer-motion";
import { DotBackgroundDemo } from "@/components/BackgroundDots";
import { MatriksPanel } from "@/components/MatrixPanel/MatriksPanel";
import { MatriksOperations } from "@/components/MatrixOperations/MatriksOperations";
import { ResultBox } from "@/components/ResultBox/Resultbox";
import { SplashScreen } from "@/components/Animate/SplashScreen";
import { IsLoading } from "@/components/Animate/IsLoading";
import { ErrorToast } from "@/components/Animate/ErrorToast";

import { useMatrixState } from "@/hooks/useMatrixState";
import { useSplashTransition } from "@/hooks/useSplashTransition";
import { fadeInUp, containerStagger } from "@/utils/animations";

export default function Home() {
  const {
    matrices,
    resultHistory,
    error,
    isLoading,
    handleMatrixChange,
    handleSwap,
    handleOperation,
    resetAll,
    clearHistory,
    setMatrixFromHistory,
    deleteHistoryItem,
    setIsLoading,
  } = useMatrixState();

  const router = useRouter();

  const { matrixA, matrixB } = matrices;
  const { showSplash, showContent } = useSplashTransition();

  return (
    <div className="overflow-hidden relative flex flex-col min-h-screen justify-center w-full items-center py-36 bg-black">
      <IsLoading isLoading={isLoading} />
      <SplashScreen showSplash={showSplash} />
      <DotBackgroundDemo />

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="w-full flex flex-col items-center justify-center"
          >
            <motion.div
              className="flex xl:flex-row justify-between items-center mx-auto w-full relative max-w-5xl flex-col gap-12 p-12 xl:p-0"
              variants={containerStagger}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <motion.div variants={fadeInUp}>
                <MatriksPanel
                  title="Matrix A"
                  matrixId="A"
                  matrix={matrixA}
                  onChange={handleMatrixChange}
                  setIsLoading={setIsLoading}
                  onOperation={handleOperation}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <MatriksOperations
                  onSwap={handleSwap}
                  onOperate={handleOperation}
                  onReset={resetAll}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <MatriksPanel
                  title="Matrix B"
                  matrixId="B"
                  matrix={matrixB}
                  onChange={handleMatrixChange}
                  setIsLoading={setIsLoading}
                  onOperation={handleOperation}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="w-full mx-auto relative max-w-5xl p-12 xl:p-0"
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <ResultBox
                history={resultHistory}
                onClear={clearHistory}
                onUseAsA={(matrix) => setMatrixFromHistory(matrix, "matrixA")}
                onUseAsB={(matrix) => setMatrixFromHistory(matrix, "matrixB")}
                onDelete={deleteHistoryItem}
              />
            </motion.div>
            <motion.div
              className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1E1E20]/80 text-white text-sm px-3 py-2 rounded-full shadow-lg shadow-[rgba(0,0,0,0.25)] border-2 border-[#1E1E20] hover:bg-neutral-800 transition-all cursor-pointer backdrop-blur-sm"
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              exit="hidden"
              onClick={() => router.push('/splc')}
            >
              <span className="font-medium tracking-tight">SplCalc</span>
              <span className="text-[10px] bg-[#cc9622] text-white px-1.5 py-0.5 items-center text-center rounded-sm">Beta</span>
            </motion.div>


          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error.message && (
          <ErrorToast errorType={error.type} errorMessage={error.message} />
        )}
      </AnimatePresence>
    </div>
  );
}
