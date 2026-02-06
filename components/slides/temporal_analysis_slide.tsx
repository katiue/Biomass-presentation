import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";
import { CloudRain, BrainCircuit, ArrowRight, Gauge } from "lucide-react";
import MonthStacksDisplay from "../MonthStacksDisplay";

const TemporalAnalysisSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    return (
        <div className="flex h-full p-8 gap-8 overflow-hidden justify-center items-center relative">
            {/* Overlay Grid for background effect */}
            <div className="absolute inset-0 pointer-events-none opacity-50">
                {/* This just lets the MonthStacksDisplay sit behind everything nicely */}
            </div>

            {/* Key Observation / Intro */}
            <div className="w-[400px] flex flex-col justify-center z-10 space-y-8 p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-bold mb-2 text-foreground tracking-tight">Temporal Analysis</h2>
                    <h3 className="text-xl text-primary font-mono font-medium">The Challenge of Time</h3>
                </motion.div>

                <div className="flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-start gap-4 p-4 bg-background/50 border border-border/50 rounded-2xl backdrop-blur-sm shadow-sm"
                    >
                        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl shrink-0">
                            <CloudRain className="w-6 h-6 text-gray-500" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">Noise & Artifacts</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Clouds, snow, and shadows vary month-to-month. A single snapshot is often misleading.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center"
                    >
                        <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-start gap-4 p-4 bg-purple-500/5 border border-purple-500/20 rounded-2xl backdrop-blur-sm shadow-sm"
                    >
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl shrink-0">
                            <BrainCircuit className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1 text-purple-700 dark:text-purple-300">Attention Mechanism</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                We moved from simple CNNs to <strong>Transformers</strong>. The model learns to "attend" to clear months and ignore noisy ones automatically.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-xl text-red-600 dark:text-red-400 text-sm font-bold justify-center"
                    >
                        <Gauge className="w-5 h-5" />
                        <span>Drawback: Heavy Computing Usage</span>
                    </motion.div>
                </div>
            </div>

            {/* Visual: Month Stacks (Unstacked) */}
            <div className="flex-1 h-full relative flex items-center justify-center -ml-20 scale-90 origin-right">
                <MonthStacksDisplay
                    isStacked={false}
                    isScanning={false}
                    patchSize="patch"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="absolute bottom-1/2 left-1/5 bg-red-500 text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-lg rotate-12"
                >
                    Ignored (Cloudy)
                </motion.div>
            </div>
        </div>
    );
});

TemporalAnalysisSlide.displayName = "TemporalAnalysisSlide";
export default TemporalAnalysisSlide;
