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
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-start">

            {/* Source 1: Sentinel-1 */}
            <motion.div
                className="bg-surface p-5 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ delay: 0.2 }}
            >
                <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <ScanLine size={120} className="text-foreground" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <Satellite className="text-secondary" /> Sentinel-1 (SAR)
                </h3>

                <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-4">
                    <img
                        src="/dataset_info/s1_clear_image.png"
                        alt="Sentinel-1 Clear"
                        className="w-full h-full object-cover grayscale contrast-125"
                    />
                    <div className="absolute top-2 left-2 bg-surface/90 backdrop-blur-md px-2 py-1 rounded text-xs font-mono text-secondary flex items-center gap-1 shadow-sm">
                        <CloudOff size={12} /> SAR (S1)
                    </div>
                </div>

                <ul className="space-y-2 text-muted text-sm flex-grow">
                    <li className="flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        <span>Radar data: Penetrates clouds, captures texture/structure.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        <span>4 bands: VV, VH Ascending/Descending.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        <span className="italic">"Quantifies structure even in bad weather."</span>
                    </li>
                </ul>
            </motion.div>

            {/* Source 2: Sentinel-2 */}
            <motion.div
                className="bg-surface p-5 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ delay: 0.4 }}
            >
                <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Layers size={120} className="text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <Satellite className="text-primary" /> Sentinel-2 (Optical)
                </h3>

                <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-4">
                    <img
                        src="/dataset_info/s2_cloudy.png"
                        alt="Sentinel-2 Cloudy"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-surface/90 backdrop-blur-md px-2 py-1 rounded text-xs font-mono text-red-600 flex items-center gap-1 shadow-sm">
                        <Cloud size={12} /> Optical (S2)
                    </div>
                </div>

                <ul className="space-y-2 text-muted text-sm flex-grow">
                    <li className="flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>Multispectral: Captures "Greenness," vegetation health (11 bands).</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>Challenge: Often obstructed by clouds.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="italic">"Tells us what is there."</span>
                    </li>
                </ul>
            </motion.div>

            {/* Source 3: Ground Truth */}
            <motion.div
                className="bg-surface p-5 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ delay: 0.6 }}
            >
                <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Layers size={120} className="text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <Layers className="text-accent" /> Ground Truth
                </h3>

                <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-4 bg-black/5">
                    <img
                        src="/assets/ground_truth.png"
                        alt="Ground Truth Heatmap"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-surface/90 backdrop-blur-md px-2 py-1 rounded text-xs font-mono text-accent flex items-center gap-1 shadow-sm">
                        <Layers size={12} /> AGB Label
                    </div>
                </div>

                <div className="space-y-2 text-muted text-sm flex-grow">
                    <p className="font-semibold text-foreground">Above Ground Biomass (AGB)</p>
                    <p className="leading-relaxed">
                        Dense, pixel-level biomass density values (Mg/ha) derived from airborne LiDAR.
                        This serves as the precise target our model learns to predict.
                    </p>
                </div>
            </motion.div>

        </div>
    </div>
    );
});

DataCollectionInputSlide.displayName = "DataCollectionInputSlide";
export default DataCollectionInputSlide;
