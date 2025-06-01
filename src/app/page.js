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

import { containerStagger } from "@/utils/animations";

const FadeInSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 40 }}
    transition={{ duration: 0.8, ease: "easeInOut", delay }}
  >
    {children}
  </motion.div>
);

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

      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full flex flex-col"
          >
 
            <motion.div
              className="flex xl:flex-row justify-between items-center mx-auto w-full max-w-5xl flex-col gap-12 p-12 xl:p-0"
              variants={containerStagger}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <FadeInSection delay={0.1}>
                <MatriksPanel
                  title="Matrix A"
                  matrixId="A"
                  matrix={matrixA}
                  onChange={handleMatrixChange}
                  setIsLoading={setIsLoading}
                  onOperation={handleOperation}
                />
              </FadeInSection>

              <FadeInSection delay={0.2}>
                <MatriksOperations
                  onSwap={handleSwap}
                  onOperate={handleOperation}
                  onReset={resetAll}
                />
              </FadeInSection>

              <FadeInSection delay={0.3}>
                <MatriksPanel
                  title="Matrix B"
                  matrixId="B"
                  matrix={matrixB}
                  onChange={handleMatrixChange}
                  setIsLoading={setIsLoading}
                  onOperation={handleOperation}
                />
              </FadeInSection>
            </motion.div>

            <FadeInSection delay={0.5}>
              <div className="w-full relative mx-auto max-w-5xl p-12 xl:p-0">
                <ResultBox
                  history={resultHistory}
                  onClear={clearHistory}
                  onUseAsA={(matrix) => setMatrixFromHistory(matrix, "matrixA")}
                  onUseAsB={(matrix) => setMatrixFromHistory(matrix, "matrixB")}
                  onDelete={deleteHistoryItem}
                />
              </div>
            </FadeInSection>

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.6,
                delay: 1,
                ease: [0.25, 0.8, 0.25, 1]
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-[#1E1E20]/80 text-white text-sm px-3 py-2 rounded-full shadow-lg shadow-[rgba(0,0,0,0.25)] border border-[#1E1E20] transition-all duration-500 ease-in-out cursor-pointer backdrop-blur-sm hover:bg-neutral-800"
              onClick={() => router.push('/splc')}
            >
              <span className="font-medium tracking-tight">SplCalc</span>
              <span className="text-[10px] bg-[#cc9622] text-white px-1.5 py-0.5 rounded-sm">
                Beta
              </span>
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
