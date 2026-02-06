import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";
import { GitBranch, Globe, CloudRain, Grid3x3, Code2, Layers, MapPin, Satellite, Filter, ArrowDownToLine, Scan } from "lucide-react";

const AIPipelineOverviewSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    return (
        <div className="flex flex-col h-full p-8 gap-6 overflow-hidden relative bg-background">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center shrink-0 z-10"
            >
                <h2 className="text-4xl font-bold text-foreground">End-to-End AI Pipeline</h2>
                <div className="flex items-center justify-center gap-2 text-muted mt-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold tracking-wider uppercase border border-primary/20">
                        From Satellite to Carbon Credit
                    </span>
                </div>
            </motion.div>

            <div className="flex-1 flex gap-8 min-h-0 z-10">
                {/* Left: Data Source (GEE Methodology) - Expanded Width */}
                <div className="w-[30%] flex flex-col justify-center relative pl-8">
                    {/* Vertical Connecting Line */}
                    <div className="absolute left-16 top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent" />

                    <div className="flex flex-col gap-8 z-10">
                        {/* Header */}
                        <div>
                            <h3 className="text-xl font-bold text-foreground">Data Acquisition</h3>
                            <p className="text-xs text-muted-foreground font-mono">Google Earth Engine Protocol</p>
                        </div>

                        {/* Step 1: User Interaction & Tiling */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-start gap-4 group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 relative z-10">
                                <MapPin className="w-7 h-7 text-blue-500" />
                            </div>
                            <div className="pt-1">
                                <h4 className="font-bold text-foreground text-base mb-1">1. ROI Selection & Tiling</h4>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>User selects target area on the interactive map interface.</li>
                                    <li>System automatically partitions area into <strong>256x256</strong> splits.</li>
                                    <li>Grid alignment matches the official <span className="font-medium text-blue-400">BioMassters</span> benchmark resolution.</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Step 2: Satellite Data Collection */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-start gap-4 group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 relative z-10">
                                <Satellite className="w-7 h-7 text-purple-500" />
                            </div>
                            <div className="pt-1">
                                <h4 className="font-bold text-foreground text-base mb-1">2. Multi-Modal Acquisition</h4>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>Parallel download of <strong>Sentinel-1 (SAR)</strong> & <strong>Sentinel-2 (Optical)</strong>.</li>
                                    <li>Covers full vegetative cycle (Sept - Aug) for phenology tracking.</li>
                                    <li>Includes VV+VH polarization (ASC/DSC) and MSI bands.</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Step 3: Benchmark-Grade Filtering */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-start gap-4 group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 relative z-10">
                                <Filter className="w-7 h-7 text-emerald-500" />
                            </div>
                            <div className="pt-1">
                                <h4 className="font-bold text-foreground text-base mb-1">3. Intelligent Cloud Filtering</h4>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>Applies <code className="bg-primary/10 px-1 py-0.5 rounded text-primary text-xs">s2-cloud-detector</code> probability masking.</li>
                                    <li>Replicates benchmark generation protocol exactly.</li>
                                    <li>Selects least cloudy monthly composites for valid inputs.</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Step 4: Pre-processing */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-start gap-4 group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 relative z-10">
                                <Scan className="w-7 h-7 text-orange-500" />
                            </div>
                            <div className="pt-1">
                                <h4 className="font-bold text-foreground text-base mb-1">4. Standardization</h4>
                                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                                    <li><strong>SAR:</strong> Log scaling & radiomentric calibration.</li>
                                    <li><strong>Optical:</strong> Level-1C (ToA) to Level-2A (BoA) conversion.</li>
                                    <li>Result: Analysis-ready data cubes matching training distribution.</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Center: Connection */}
                <div className="flex flex-col items-center justify-center opacity-20 text-foreground">
                    <GitBranch className="w-8 h-8 rotate-90" />
                </div>

                {/* Right: Pipeline Image - Enhanced Display */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex-1 flex flex-col gap-4"
                >
                    {/* Title Text Moved Outside */}
                    <div className="flex items-center gap-3 pl-2">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary border border-primary/20">
                            <Layers className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-xl leading-tight text-foreground">Project Architecture</h3>
                            <p className="text-xs text-muted-foreground font-mono">End-to-End Workflow</p>
                        </div>
                    </div>

                    {/* Adaptive Cropping Connection Callout */}
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 mx-2">
                        <div className="flex items-start gap-2">
                            <Scan className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            <div>
                                <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-1">✓ The Solution: Pixel-Accurate Segmentation</h4>
                                <p className="text-xs text-foreground/80 leading-relaxed">
                                    Our forest detection model achieves what adaptive cropping <strong className="text-red-600 dark:text-red-400">couldn't</strong>: separating forests from non-forests. Unlike block-based partitioning, segmentation follows <strong className="text-emerald-600 dark:text-emerald-300">exact forest boundaries</strong> at pixel-level accuracy—no wasted processing, no missed details.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-2 shadow-2xl relative group overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-primary/5 " />

                        <img
                            src="/model/AI_pipeline_overview.png"
                            alt="AI Pipeline Overview"
                            className="w-full h-auto max-h-full object-contain rounded shadow-lg relative z-10"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
});

AIPipelineOverviewSlide.displayName = "AIPipelineOverviewSlide";
export default AIPipelineOverviewSlide;
