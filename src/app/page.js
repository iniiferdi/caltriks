'use client';

import { DotBackgroundDemo } from "@/components/BackgroundDots/index";
import { MatriksOperations } from "@/components/MatrixOperations/index";
import { MatriksPanel } from "@/components/MatrixPanel/MatriksPanel";

import { motion } from "framer-motion";

export default function Home() {

  return (

    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-black ">
      <DotBackgroundDemo />

      <div className="flex xl:flex-row justify-between items-center w-full relative max-w-5xl flex-col gap-12 p-12 xl:p-0">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MatriksPanel title="Matriks A" matrixId="matrixA" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MatriksOperations />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MatriksPanel title="Matriks B" matrixId="matrixB" />
        </motion.div>
      </div>

    </div>
  );
}
