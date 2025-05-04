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
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Header/Footer";

export default function Home() {
  const {
    matrices, resultHistory, error, isLoading,
    handleMatrixChange, handleSwap, handleOperation,
    resetAll, clearHistory, useAsMatrix, deleteHistoryItem, setIsLoading
  } = useMatrixState();

  const { showSplash, showContent } = useSplashTransition();

  return (
    <div className="overflow-hidden relative flex flex-col min-h-screen justify-center w-full items-center pt-36 bg-black">

      <IsLoading isLoading={isLoading} />
      <SplachScreen showSplash={showSplash} />
      <DotBackgroundDemo />

      {showContent && (
        <Header onReset={resetAll} />
      )}

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
                  matrixId="matrixA"
                  matrix={matrices.matrixA}
                  setIsLoading={setIsLoading}
                  onChange={handleMatrixChange}
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
                  matrixId="matrixB"
                  matrix={matrices.matrixB}
                  setIsLoading={setIsLoading}
                  onChange={handleMatrixChange}
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
                onUseAsA={(matrix) => useAsMatrix(matrix, "matrixA")}
                onUseAsB={(matrix) => useAsMatrix(matrix, "matrixB")}
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

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="w-full relative"
      >
        <Footer />
      </motion.footer>
      
    </div>


  );
}