import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { Trees, Map as MapIcon, Globe, Scale, Calendar, Scan } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const DatasetOverviewSlide = forwardRef<SlideHandle, SlideProps>(({ isActive }, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    return (
        <div className="w-full h-full flex flex-col md:flex-row bg-background p-8 md:p-16 gap-8 overflow-hidden relative">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

            {/* Left Content Column */}
            <div className="flex-1 flex flex-col justify-start z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="flex items-center gap-3 m-6">
                        <span className="p-2 bg-primary-muted rounded-lg border border-primary/30 text-primary">
                            <Trees size={24} />
                        </span>
                        <span className="text-primary-foreground font-mono tracking-wider text-sm uppercase">Dataset Overview</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-muted to-gray-500 mb-8 leading-tight">
                        The BioMassters
                    </h1>

                    <div className="grid grid-cols-2 gap-4 text-muted text-lg font-light leading-relaxed">
                        <motion.div
                            className="p-4 rounded-xl slide-panel bg-surface border border-gray-200 shadow-sm backdrop-blur-sm hover:bg-surface-highlight transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-foreground font-semibold mb-1 flex items-center gap-2">
                                <Scale className="w-4 h-4 text-primary" /> Objective
                            </h3>
                            <p className="text-sm text-muted">Estimate <strong className="text-primary-foreground">Above Ground Biomass (AGB)</strong> (tonnes/hectare).</p>
                        </motion.div>

                        <motion.div
                            className="p-4 rounded-xl slide-panel bg-surface border border-gray-200 shadow-sm backdrop-blur-sm hover:bg-surface-highlight transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h3 className="text-foreground font-semibold mb-1 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-accent" /> Impact
                            </h3>
                            <p className="text-sm text-muted">Carbon tracking, climate change mitigation, and forestry management.</p>
                        </motion.div>

                        <motion.div
                            className="p-4 rounded-xl slide-panel bg-surface border border-gray-200 shadow-sm backdrop-blur-sm hover:bg-surface-highlight transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-foreground font-semibold mb-1 flex items-center gap-2">
                                <MapIcon className="w-4 h-4 text-secondary" /> Training Data
                            </h3>
                            <p className="text-sm text-muted">~13,000 patches of forest in Finland. Size: <strong>300GB</strong>.</p>
                        </motion.div>

                        <motion.div
                            className="p-4 rounded-xl slide-panel bg-surface border border-gray-200 shadow-sm backdrop-blur-sm hover:bg-surface-highlight transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h3 className="text-foreground font-semibold mb-1 flex items-center gap-2">
                                <MapIcon className="w-4 h-4 text-secondary" /> Testing Data
                            </h3>
                            <p className="text-sm text-muted">2,000 patches of forest in Finland. Size: <strong>50GB</strong>.</p>
                        </motion.div>

                        <motion.div
                            className="p-4 rounded-xl slide-panel bg-surface border border-gray-200 shadow-sm backdrop-blur-sm hover:bg-surface-highlight transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h3 className="text-foreground font-semibold mb-1 flex items-center gap-2">
                                <Scan className="w-4 h-4 text-primary" /> Coverage
                            </h3>
                            <p className="text-sm text-muted"><strong>8.5 million</strong> hectares.</p>
                        </motion.div>

                        <motion.div
                            className="p-4 rounded-xl slide-panel bg-surface border border-gray-200 shadow-sm backdrop-blur-sm hover:bg-surface-highlight transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                            transition={{ delay: 0.6 }}
                        >
                            <h3 className="text-foreground font-semibold mb-1 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-accent" /> Time Frame
                            </h3>
                            <p className="text-sm text-muted">Sep 2016 - Aug 2021.</p>
                        </motion.div>

                    </div>
                </motion.div>
            </div>

            {/* Right Visual Column */}
            <div className="flex-1 flex items-center justify-end relative z-10">
                {/* Floating Caption */}
                <div className="absolute flex flex-col justify-center items-center -top-10 right-0 left-28 bg-surface/90 backdrop-blur-md p-3 rounded-lg z-12">
                    <div className="text-lg font-mono text-primary mb-1">DATA DISTRIBUTION</div>
                    <div className="text-foreground text-lg">Forest Patches across Finland</div>
                </div>
                <motion.div
                    className="relative w-full max-w-3xl aspect-square rounded-2xl overflow-hidden shadow-2xl border border-gray-200 group bg-surface z-11"
                    initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9, rotateY: isActive ? 0 : 10 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Main Image */}
                    <img
                        src="/dataset_info/Lidar_coverage.png"
                        alt="Lidar Coverage Map"
                        className="w-full h-full object-contain p-4"
                    />
                </motion.div>
            </div>
        </div>
    );
});

DatasetOverviewSlide.displayName = "DatasetOverviewSlide";
export default DatasetOverviewSlide;
