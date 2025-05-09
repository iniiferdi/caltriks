'use client';

import { AnimatePresence, motion } from "framer-motion";
import { DotBackgroundDemo } from "@/components/BackgroundDots";
import { MatriksPanel } from "@/components/MatrixPanel/MatriksPanel";
import { MatriksOperations } from "@/components/MatrixOperations/MatriksOperations";
import { ResultBox } from "@/components/ResultBox/Resultbox";
import { SplachScreen } from "@/components/Animate/SplashScreen";
import { IsLoading } from "@/components/Animate/IsLoading";
import { ErrorToast } from "@/components/Animate/ErrorToast";

import { useMatrixState } from "@/hooks/useMatrixState";
import { useSplashTransition } from "@/hooks/useSplashTransition";

import { fadeInUp, containerStagger } from "@/utils/animations";

export default function Home() {
  const {
    matrices, resultHistory, error, isLoading,
    handleMatrixChange, handleSwap, handleOperation,
    resetAll, clearHistory, setMatrixFromHistory, deleteHistoryItem, setIsLoading
  } = useMatrixState();
  
  const { matrixA, matrixB } = matrices;  

  const { showSplash, showContent } = useSplashTransition();

  return (
    <div className="overflow-hidden relative flex flex-col min-h-screen justify-center w-full items-center py-36 bg-black">

      <IsLoading isLoading={isLoading} />
      <SplachScreen showSplash={showSplash} />
      <DotBackgroundDemo />



      <AnimatePresence>
        {showContent && (
          <>
            <motion.div
              className="flex xl:flex-row justify-between items-center w-full relative max-w-5xl flex-col gap-12 p-12 xl:p-0"
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
          </>
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