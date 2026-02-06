"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Cpu, ArrowRight, Box, Grid3x3 } from "lucide-react";
import { SlideHandle } from "../../types";
import MonthStacksDisplay from "../../components/MonthStacksDisplay";

const Stage2Inference = forwardRef<SlideHandle, { isActive: boolean }>(({ isActive }, ref) => {
    // Animation Steps:
    // 0: Show all inputs (15-ch satellite + 1-ch Stage 1 result = 16 channels)
    // 1: Extract patch (64x64) and show temporal stack
    // 2: Process through 3D U-Net
    // 3: Show sliding window processing all patches
    // 4: Final refined output
    // 5: Compare against Ground Truth
    const [step, setStep] = useState(0);
    const [processingProgress, setProcessingProgress] = useState(0);

    useImperativeHandle(ref, () => ({
        next: () => {
            if (step < 5) {
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
            setProcessingProgress(0);
        }
    }, [isActive]);

    // Auto-advance step 0 -> 1 after a moment
    useEffect(() => {
        if (isActive && step === 0) {
            const timer = setTimeout(() => setStep(1), 1500);
            return () => clearTimeout(timer);
        }
    }, [isActive, step]);

    // Animate processing progress in step 3
    useEffect(() => {
        if (step === 3) {
            const interval = setInterval(() => {
                setProcessingProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [step]);

    return (
        <div className="w-full h-full flex flex-col items-center relative overflow-hidden bg-background select-none">

            {/* Header */}
            <motion.div
                className="absolute top-8 left-0 w-full text-center z-20 pointer-events-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="inline-flex items-center space-x-2 bg-surface border border-gray-200 shadow-sm px-4 py-1.5 rounded-full mb-3">
                    <Layers className="w-4 h-4 text-accent" />
                    <span className="text-sm font-mono text-accent">STAGE 2: SPATIAL REFINEMENT</span>
                </div>
                <h1 className="text-4xl font-bold text-foreground">
                    Patch-Wise Context Enhancement
                </h1>
            </motion.div>

            {/* Main Stage Container */}
            <div className="flex-1 w-full flex items-center justify-center gap-6 px-8">
                {/* COMPONENT 1: INPUT DATA STACK */}
                <motion.div
                    className="relative flex-shrink-0"
                    animate={{
                        scale: step >= 2 ? 0.8 : 0.9, // Make even smaller to fit 12 months
                        x: step >= 2 ? -40 : -20,
                    }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex flex-col gap-6 items-center">
                        {/* Stage 1 Result (1 channel) */}
                        <div className="relative">
                            <div className="text-xs text-muted font-mono mb-2 text-center">
                                Stage 1 Result (1 ch)
                            </div>
                            <div className="relative w-[400px] h-[400px] rounded-lg overflow-hidden border-2 border-primary/40 bg-white shadow-lg shadow-primary/20">
                                <img
                                    src="/assets/stage1_output.png"
                                    className="w-full h-full object-contain"
                                    alt="Stage 1 output"
                                />
                                <div className="absolute top-2 right-2 bg-primary/90 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                                    COARSE ESTIMATE
                                </div>

                                {/* Patch highlight in step 1 */}
                                {step >= 1 && step < 3 && (
                                    <motion.div
                                        className="absolute w-1/4 h-1/4 border-2 border-green-400 bg-green-400/30 z-10"
                                        initial={{ top: "0%", left: "0%", opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ boxShadow: "0 0 20px rgba(74, 222, 128, 0.6)" }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Satellite Data (15 channels) - USING MonthStacksDisplay */}
                        <div className="relative">
                            <div className="text-xs text-muted font-mono mb-2 text-center">
                                Satellite Data (12 Months × 15 Bands)
                            </div>
                            <div className="relative w-[400px] h-[300px] flex items-center justify-center overflow-visible">
                                <div className="transform scale-60 origin-center">
                                    <div className="w-[600px] h-[500px]">
                                        <MonthStacksDisplay
                                            isStacked={true}
                                            isScanning={false}
                                            patchSize="patch"
                                            showFirstPixelHighlight={step >= 1 && step < 3}
                                            animationDuration={0}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* COMPONENT 2: EXTRACTED PATCH STACK */}
                <AnimatePresence>
                    {step >= 1 && (
                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                        >
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* COMPONENT 3: 3D U-NET MODEL */}
                <AnimatePresence>
                    {step >= 2 && (
                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <ArrowRight className="w-6 h-6 text-muted" />

                            <div className="relative group">
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-accent/30 blur-2xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />

                                {/* Model box */}
                                <div className="w-28 h-28 bg-white border border-accent/40 rounded-2xl flex flex-col items-center justify-center shadow-lg relative z-10">
                                    <Cpu className="w-12 h-12 text-accent mb-2" />
                                    <span className="text-[10px] font-bold text-muted">STAGE 2</span>
                                    <span className="text-[8px] text-muted font-mono">3D U-Net</span>
                                </div>

                                {/* Processing particles */}
                                {step === 3 && (
                                    <>
                                        <motion.div
                                            className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full z-20"
                                            animate={{
                                                x: [0, 40, 60],
                                                y: [0, -10, -5],
                                                opacity: [1, 0.5, 0]
                                            }}
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                        />
                                        <motion.div
                                            className="absolute bottom-2 right-2 w-2 h-2 bg-secondary rounded-full z-20"
                                            animate={{
                                                x: [0, 50, 70],
                                                y: [0, 10, 5],
                                                opacity: [1, 0.5, 0]
                                            }}
                                            transition={{ duration: 0.9, repeat: Infinity, delay: 0.3 }}
                                        />
                                    </>
                                )}
                            </div>

                            <ArrowRight className="w-6 h-6 text-muted" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* COMPONENT 4: OUTPUT */}
                <AnimatePresence>
                    {step >= 2 && (
                        <motion.div
                            className="flex flex-col items-center gap-4"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: step >= 5 ? 0 : 0, width: step >= 5 ? "auto" : "auto" }}
                            transition={{ delay: 1 }}
                        >
                            <motion.div
                                className="flex items-center gap-4"
                                animate={{ gap: step >= 5 ? 30 : 0 }}
                            >
                                <div className="relative w-[350px] h-[350px] bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg group">

                                    {/* Base Image (Stage 1 / Empty) */}
                                    <div className="absolute inset-0 opacity-20 bg-gray-100">
                                        <img src="/assets/stage1_output.png" className="w-full h-full object-contain grayscale" />
                                    </div>

                                    {/* Step 2-4: 64x64 Grid Overlay & Processing */}
                                    <div className="absolute inset-0">
                                        {/* CSS Grid Pattern for 64x64 */}
                                        <div
                                            className="absolute inset-0 z-20 pointer-events-none"
                                            style={{
                                                backgroundImage: `
                                                linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                                                linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
                                            `,
                                                backgroundSize: `${100 / 64}% ${100 / 64}%`
                                            }}
                                        />

                                        {/* Progress Mask reveal of Final Image */}
                                        <div className="absolute inset-0 z-10">
                                            {/* The revealed refined part */}
                                            <motion.div
                                                className="absolute inset-0 w-full h-full bg-black/5"
                                                style={{
                                                    clipPath: step === 4 || step === 5
                                                        ? "inset(0 0 0 0)"
                                                        : step === 3
                                                            ? (() => {
                                                                const p = processingProgress / 100;
                                                                return `inset(0 0 ${100 - (p * 100)}% 0)`;
                                                            })()
                                                            : "inset(100% 0 0 0)"
                                                }}
                                            >
                                                <img
                                                    src="/assets/stage2_output.png"
                                                    className="w-full h-full object-contain"
                                                    alt="Stage 2 Output"
                                                />
                                                {/* Glowing leading edge during processing */}
                                                {step === 3 && (
                                                    <div className="absolute bottom-0 w-full h-[2px] bg-accent shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                                                )}
                                            </motion.div>
                                        </div>

                                        {/* Active Processing Cell Highlight (Small moving box) */}
                                        {step === 3 && (
                                            <motion.div
                                                className="absolute w-[calc(100%/64)] h-[calc(100%/64)] border border-accent bg-accent/50 z-30 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                                                animate={{
                                                    left: ["0%", "100%"],
                                                    top: [`${(processingProgress / 100) * 100}%`, `${(processingProgress / 100) * 100}%`]
                                                }}
                                                transition={{ duration: 0.1, repeat: Infinity }}
                                            />
                                        )}
                                    </div>

                                    {/* Step 4: Final Refined Badge */}
                                    {step === 4 && (
                                        <motion.div
                                            className="absolute inset-0 z-40 pointer-events-none"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 1.2 }}
                                        >
                                            <div className="absolute top-3 right-3 bg-gradient-to-r from-accent to-secondary text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                                                ✨ REFINED 64×64
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Comparison VS and Ground Truth (Step 5) */}
                                {step >= 5 && (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-2xl font-bold text-muted mx-4"
                                        >
                                            VS
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="relative w-[350px] h-[350px] bg-white border-2 border-primary rounded-xl overflow-hidden shadow-lg"
                                        >
                                            <div className="absolute top-2 right-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded font-bold z-10">Ground Truth</div>
                                            <img src="/assets/ground_truth.png" className="w-full h-full object-contain" alt="Ground Truth" />
                                        </motion.div>
                                    </>
                                )}
                            </motion.div>

                            <div className="text-center text-muted text-lg font-mono">
                                {step === 2 && "Preparing patches..."}
                                {step === 3 && `Processing: ${processingProgress}%`}
                                {step === 4 && "High-Resolution Biomass Map"}
                                {step === 5 && "Prediction vs Ground Truth"}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            {/* Info panel */}
            <AnimatePresence>
                {step >= 1 && step < 4 && (
                    <motion.div
                        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-surface/80 backdrop-blur-md border border-gray-200 px-6 py-3 rounded-2xl max-w-2xl shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <div className="flex items-center gap-4 text-sm text-foreground">
                            <Grid3x3 className="w-5 h-5 text-accent" />
                            <div>
                                <span className="font-bold text-accent">3D U-Net Architecture:</span> Process 64×64 patches with full temporal context (12 months × 16 channels) to capture spatial relationships and refine predictions
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Instruction Footer */}
            <div className="absolute bottom-10 animate-bounce text-muted font-mono text-xs">
                {step === 0 && "Initializing..."}
                {step === 1 && "Click to Extract Patch"}
                {step === 2 && "Click to Start Processing"}
                {step === 3 && (processingProgress >= 100 ? "Click to Reveal Map" : "Processing patches...")}
                {step === 4 && "Stage Complete"}
            </div>

        </div>
    );
});

Stage2Inference.displayName = "Stage2Inference";
export default Stage2Inference;
