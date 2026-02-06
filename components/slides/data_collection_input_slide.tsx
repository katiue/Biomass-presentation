import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { Satellite, Cloud, CloudOff, Layers, ScanLine } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const DataCollectionInputSlide = forwardRef<SlideHandle, SlideProps>(({ isActive }, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    return (<div className="w-full h-full flex flex-col bg-background p-8 md:p-12 overflow-hidden relative">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[100px] rounded-full mix-blend-multiply" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[100px] rounded-full mix-blend-multiply" />
        </div>

        {/* Header */}
        <motion.div
            className="relative z-10 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                Data Collection - <span className="text-secondary">The Input (Multi-Modal)</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary to-transparent rounded-full" />
        </motion.div>

        {/* Main Content Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 h-full items-center">

            {/* Info Column */}
            <div className="space-y-8">
                {/* Source 1: Sentinel-1 */}
                <motion.div
                    className="bg-surface p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -30 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <ScanLine size={100} className="text-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                        <Satellite className="text-secondary" /> Sentinel-1 (SAR)
                    </h3>
                    <ul className="space-y-2 text-muted text-sm">
                        <li className="flex items-start gap-2">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary" />
                            <span>Radar data: Penetrates clouds, captures texture/structure.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary" />
                            <span>4 bands: VV, VH Ascending/Descending.</span>
                        </li>
                    </ul>
                </motion.div>

                {/* Source 2: Sentinel-2 */}
                <motion.div
                    className="bg-surface p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -30 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Layers size={100} className="text-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                        <Satellite className="text-primary" /> Sentinel-2 (Optical)
                    </h3>
                    <ul className="space-y-2 text-muted text-sm">
                        <li className="flex items-start gap-2">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>Multispectral: Captures "Greenness," vegetation health (11 bands).</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>Challenge: Often obstructed by clouds.</span>
                        </li>
                    </ul>
                </motion.div>

                <motion.div
                    className="p-4 rounded-xl bg-secondary/10 border border-secondary/30 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
                    transition={{ delay: 0.6 }}
                >
                    <h4 className="text-secondary font-mono text-sm uppercase mb-1">Collection Frequency</h4>
                    <p className="text-foreground font-bold text-lg">Monthly Data Collection</p>
                </motion.div>
            </div>

            {/* Visual Comparison Column */}
            <div className="flex flex-col gap-4">
                <motion.div
                    className="relative flex justify-center items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <div className="grid grid-cols-2 gap-4 w-full">
                        {/* Sentinel 2 (Cloudy) */}
                        <div className="space-y-2">
                            <div className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-md">
                                <img
                                    src="/dataset_info/s2_cloudy.png"
                                    alt="Sentinel-2 Cloudy"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 left-2 bg-surface/90 backdrop-blur-md px-2 py-1 rounded text-xs font-mono text-red-600 flex items-center gap-1 shadow-sm">
                                    <Cloud size={12} /> Optical (S2)
                                </div>
                            </div>
                            <p className="text-center text-xs text-muted">Cloud Obstruction</p>
                        </div>

                        {/* Sentinel 1 (Clear) */}
                        <div className="space-y-2">
                            <div className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-md">
                                <img
                                    src="/dataset_info/s1_clear_image.png"
                                    alt="Sentinel-1 Clear"
                                    className="w-full h-full object-cover grayscale contrast-125" // Styling to emphasize SAR nature
                                />
                                <div className="absolute top-2 left-2 bg-surface/90 backdrop-blur-md px-2 py-1 rounded text-xs font-mono text-secondary flex items-center gap-1 shadow-sm">
                                    <CloudOff size={12} /> SAR (S1)
                                </div>
                            </div>
                            <p className="text-center text-xs text-muted">Clear Structure</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="text-center text-sm text-muted italic mt-4 max-w-md mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ delay: 0.8 }}
                >
                    "Optical tells us <strong>what is there</strong>, while Radar quantifies structure <strong>even in bad weather</strong>."
                </motion.div>
            </div>

        </div>
    </div>
    );
});

DataCollectionInputSlide.displayName = "DataCollectionInputSlide";
export default DataCollectionInputSlide;
