'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { DotBackgroundDemo } from '@/components/BackgroundDots';
import EquationForm from '@/components/SPL/EquationForm/EquationForm';
import MethodSelector from '@/components/SPL/MethodSelector/MethodSelector';
import ResultBox from '@/components/SPL/ResultBox/ResultBox';
import { ErrorToast } from '@/components/Animate/ErrorToast';

import { containerVariants, childVariants } from '@/utils/animations';
import useSplcLogic from '@/hooks/useSplcLogic';

export default function SplcPage() {
  const {
    variableCount,
    inputs,
    error,
    selectedLabel,
    resultHistory,
    handleClear,
    handleAdd,
    handleRemove,
    handleInputChange,
    setSelectedLabel,
    handleSolve,
  } = useSplcLogic();


  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-black py-36 overflow-hidden">
      <DotBackgroundDemo />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-8 pointer-events-auto w-full max-w-lg px-4 text-white"
      >
        <motion.div variants={childVariants}>
          <EquationForm
            variableCount={variableCount}
            inputs={inputs}
            onClear={handleClear}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onInputChange={handleInputChange}

          />
        </motion.div>

        <motion.div variants={childVariants}>
          <MethodSelector
            selectedLabel={selectedLabel}
            setSelectedLabel={setSelectedLabel}
            onSolve={handleSolve}
          />
        </motion.div>


        {resultHistory.length > 0 && (
          <motion.div variants={childVariants}>
            <div className='flex flex-row justify-between items-center'>
              <h2 className="text-md mt-4 mb-4 text-gray-400 font-semibold">Result</h2>
             


            </div>
            <div className="space-y-4">
              {resultHistory.map(entry => (
                <ResultBox
                  key={entry.id}
                  result={entry.result}
                  inputMatrix={entry.input}
                  label={entry.method}
                />
              ))}
            </div>
          </motion.div>
        )}

      </motion.div>

      <AnimatePresence>
        {error.message && (
          <ErrorToast errorType={error.type} errorMessage={error.message} />
        )}
      </AnimatePresence>
    </div>
  );
}
