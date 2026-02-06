"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { Database, Layers } from "lucide-react";
import MonthStacksDisplay from "../../components/MonthStacksDisplay";
import { SlideHandle } from "../../types";

const InputDataSlide = forwardRef<SlideHandle, { isActive: boolean }>(({ isActive }, ref) => {
    const [step, setStep] = useState(0);

    useImperativeHandle(ref, () => ({
        next: () => {
            if (step < 1) {
                setStep(s => s + 1);
                return true;
            }
            return false;
        },
        prev: () => {
            if (step > 0) {
                setStep(s => s - 1);
                return true;
            }
            return false;
        }
    }));

    useEffect(() => {
        if (isActive) {
            setStep(0);
        }
    }, [isActive]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-br from-background via-white to-background">
            {/* Header */}
            <motion.div
                className="absolute top-6 text-center z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground via-secondary to-foreground bg-clip-text text-transparent">
                    Data input
                </h1>
                <p className="text-muted mt-3 text-lg">
                    {step === 0 ? "15 Channels × 12 Months = 180 Data Layers" : "Organized into 12 months sequence"}
                </p>
            </motion.div>

            {/* Main Content Area */}
            <div className="relative w-full h-full flex items-center justify-center pt-15 pb-20">

                {/* Scaled down display */}
                <motion.div
                    className="relative w-full h-full flex items-center justify-center"
                    animate={{
                        scale: step === 0 ? 0.8 : 1.2,
                        y: step === 0 ? 0 : -20
                    }}
                    transition={{ duration: 1, type: "spring", stiffness: 80 }}
                >
                    <MonthStacksDisplay
                        isStacked={step >= 1}
                        isScanning={false}
                        animationDuration={1.2}
                        patchSize="patch"
                    />
                </motion.div>
            </div>

            {/* Footer Instruction */}
            <motion.div
                className="absolute bottom-8 text-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <div className="text-muted text-sm font-mono bg-surface px-3 py-1 rounded-full backdrop-blur-sm border border-gray-200">
                    {step === 0 ? "▼ Click to Stack by Month" : "Proceed to Model Pipeline →"}
                </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl mix-blend-multiply" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl mix-blend-multiply" />
            </div>
        </div>
    );
});

InputDataSlide.displayName = "InputDataSlide";
export default InputDataSlide;
