"use client";

import { useState, useEffect, useMemo, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, ScanLine } from "lucide-react";
import MonthStacksDisplay from "../../components/MonthStacksDisplay";
import rawData from "../../public/assets/stage1_raw.json";
import { SlideHandle } from "../../types";

const Stage1Inference = forwardRef<SlideHandle, { isActive: boolean }>(({ isActive }, ref) => {
    // Steps:
    // 0: Initial View (Stack Data)
    // 1: Zoom First Image (Highlight)
    // 2: Pixel Extraction (Column Formation -> Model -> First Output)
    // 3: Full Grid Scanning (Process all pixels -> Show Numbers)
    // 4: Final Output (Replace Numbers with Image)
    // 5: Compare against Ground Truth
    const [step, setStep] = useState(0);
    const [completedPixels, setCompletedPixels] = useState(0);

    // Expose Navigation Control
    useImperativeHandle(ref, () => ({
        next: () => {
            if (step < 5) {
                // Special handling for Step 3 (Scanning) logic if needed?
                // For now, just advance.
                setStep(s => s + 1);
                return true; // Handled
            }
            return false; // Let parent move to next slide
        },
        prev: () => {
            if (step > 0) {
                setStep(s => s - 1);
                return true;
            }
            return false;
        }
    }));

    // Reset when slide becomes active
    useEffect(() => {
        if (isActive) {
            setStep(0);
            setCompletedPixels(0);
        }
    }, [isActive]);

    // Auto-advance step 0 -> 1 after a moment (Intro Animation)
    useEffect(() => {
        if (isActive && step === 0) {
            const timer = setTimeout(() => setStep(1), 1000);
            return () => clearTimeout(timer);
        }
    }, [isActive, step]);

    // Quick-fill the grid in Step 3
    useEffect(() => {
        if (step === 3) {
            const interval = setInterval(() => {
                setCompletedPixels(prev => {
                    if (prev >= 512) { // 16 * 32 = 512 total items in rawData
                        clearInterval(interval);
                        return 512;
                    }
                    return prev + 10;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [step]);


    const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

    // Data for the 16x32 grid
    // Flatten the rawData for easier rendering limits
    const flatData = useMemo(() => (rawData as number[][]).flat(), []);

    return (
        <div
            className="w-full h-full flex flex-col items-center relative overflow-hidden bg-background select-none"
        // onClick handler removed - handled by parent via ref
        >
            {/* Header */}
            <motion.div
                className="absolute top-8 left-0 w-full text-center z-20 pointer-events-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="inline-flex items-center space-x-2 bg-white border border-gray-200 shadow-sm px-4 py-1.5 rounded-full mb-3">
                    <ScanLine className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-mono text-secondary">STAGE 1: TEMPORAL FEATURE EXTRACTION</span>
                </div>
                <h1 className="text-4xl font-bold text-foreground">
                    Pixel-Wise Biomass Inference
                </h1>
            </motion.div>

            {/* Main Stage Container - Horizontal Flex */}
            <div className="flex-1 w-full flex items-center justify-center gap-8">

                {/* COMPONENT 1: INPUT STACK */}
                <motion.div
                    className="relative flex-shrink-0"
                    animate={{
                        scale: step >= 2 ? 0.9 : 1.3,
                        x: step >= 2 ? -50 : 0,
                        opacity: 1
                    }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="w-[600px] h-[600px] relative">
                        {/* We use the existing MonthStacksDisplay but control scanning prop */}
                        <MonthStacksDisplay
                            isStacked={true}
                            isScanning={step === 3}
                            showFirstPixelHighlight={step >= 1 && step < 3} // Highlight during specific steps
                            animationDuration={0}
                            patchSize="pixel" // Small dot
                        />
                    </div>
                </motion.div>


                {/* COMPONENT 2: PIXEL EXTRACTION COLUMN */}
                <AnimatePresence>
                    {step >= 2 && (
                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                        >
                            <ArrowRight className="w-6 h-6 text-muted" />

                            <motion.div
                                className="flex flex-col gap-2 p-3 bg-surface border border-gray-200 rounded-xl backdrop-blur-sm h-auto max-h-[700px] justify-center min-w-[80px] shadow-sm"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                            >
                                <div className="text-[10px] text-muted font-mono text-center mb-1">1x180 Vector</div>

                                <div className="grid grid-cols-3 gap-[2px] h-full overflow-y-auto overflow-x-hidden p-1 custom-scrollbar w-fit mx-auto">
                                    {Array.from({ length: 180 }).map((_, i) => {
                                        // Map index to Month (0-11) and Channel (0-14)
                                        // 180 items = 12 months * 15 channels
                                        // We want to group by month mostly? Or channel? 
                                        // Standard flattened vector is usually [M0_C0, M0_C1... M0_C14, M1_C0...]
                                        const monthIdx = Math.floor(i / 15);
                                        const chanIdx = i % 15;

                                        return (
                                            <motion.div
                                                key={i}
                                                className="w-[6px] h-[6px] rounded-[1px] relative overflow-hidden"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.002 + 0.5 }}
                                            >
                                                <div
                                                    className="absolute inset-0 bg-cover bg-no-repeat opacity-80"
                                                    style={{
                                                        // Use the specific channel image or fallback to Sentinel-2 RGB for visual variety
                                                        backgroundImage: `url(/assets/m${monthIdx}_ch${chanIdx}.png), url(/assets/s2_${monthIdx}.png)`,
                                                        backgroundSize: '3000%', // Extreme zoom to simulate a single pixel value
                                                        backgroundPosition: 'center',
                                                        filter: 'contrast(1.5) brightness(1.2)' // Make it pop
                                                    }}
                                                />
                                                {/* Color tint overlay for aesthetic consistency */}
                                                <div className="absolute inset-0 bg-secondary/20 mixed-blend-overlay" />
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* COMPONENT 3: MODEL INFERENCE */}
                <AnimatePresence>
                    {step >= 2 && (
                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <ArrowRight className="w-6 h-6 text-muted" />

                            <div className="relative group">
                                <div className="absolute inset-0 bg-secondary/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="w-24 h-24 bg-white border border-secondary/30 rounded-2xl flex flex-col items-center justify-center shadow-lg relative z-10">
                                    <Cpu className="w-10 h-10 text-secondary mb-2" />
                                    <span className="text-[10px] font-bold text-muted">STAGE 1</span>
                                    <span className="text-[8px] text-muted font-mono">1D CNN model</span>
                                </div>

                                {/* Processing particles */}
                                {step === 3 && (
                                    <motion.div
                                        className="absolute top-0 right-0 w-3 h-3 bg-warning rounded-full z-20"
                                        animate={{ x: [0, 60], y: [0, -20], opacity: [1, 0] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    />
                                )}
                            </div>
                            <ArrowRight className="w-6 h-6 text-muted" />

                        </motion.div>
                    )}
                </AnimatePresence>


                {/* COMPONENT 4: OUTPUT GRID / IMAGE */}
                <AnimatePresence>
                    {step >= 2 && (
                        <motion.div
                            className="flex flex-col items-center gap-4"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5 }}
                        >
                            <div className="relative w-[300px] h-[300px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">

                                {/* 3.1: FIRST SINGLE OUTPUT (Step 2) */}
                                {step === 2 && (
                                    <motion.div
                                        className="text-4xl font-mono font-bold text-primary"
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                    >
                                        {(flatData[0] * 100).toFixed(1)}
                                    </motion.div>
                                )}

                                {/* 3.2: RAW NUMBERS GRID (Step 3) */}
                                {step === 3 && (
                                    <div
                                        className="w-full h-full gap-[1px] p-1 grid"
                                        style={{ gridTemplateColumns: "repeat(32, 1fr)", gridTemplateRows: "repeat(16, 1fr)" }}
                                    >
                                        {flatData.slice(0, 512).map((val, i) => (
                                            <div
                                                key={i}
                                                className={`flex items-center justify-center text-[4px] leading-none font-mono ${i < completedPixels ? "text-primary/80" : "text-gray-200"}`}
                                            >
                                                {i < completedPixels ? (val * 100).toFixed(0) : "."}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 3.3: FINAL IMAGE (Step 4 & 5) */}
                                {step >= 4 && (
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1 }}
                                    >
                                        <img
                                            src="/assets/stage1_output.png"
                                            className="w-full h-full object-contain"
                                            alt="Stage 1 Output"
                                        />
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
                                        className="relative w-[300px] h-[300px] bg-white border-2 border-primary rounded-xl overflow-hidden shadow-lg"
                                    >
                                        <div className="absolute top-2 right-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded font-bold z-10">Ground Truth</div>
                                        <img src="/assets/ground_truth.png" className="w-full h-full object-contain" alt="Ground Truth" />
                                    </motion.div>
                                </>
                            )}

                            <div className="text-center text-muted text-xl text-bold font-mono">
                                {step === 2 && "Single Pixel Prediction"}
                                {step === 3 && "Inference..."}
                                {step === 4 && "Final Raw Output"}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            {/* Instruction Footer */}
            <div className="absolute bottom-10 animate-bounce text-muted font-mono text-xs cursor-pointer hover:text-foreground transition-colors">
                {step === 0 && "Initializing..."}
                {step === 1 && "Click to Extract Pixel"}
                {step === 2 && "Click to Run Batch"}
                {step === 3 && (completedPixels >= 512 ? "Click to Reveal Map" : "Processing...")}
                {step === 4 && "Stage Complete"}
            </div>

        </div >
    );
});

Stage1Inference.displayName = "Stage1Inference";
export default Stage1Inference;
