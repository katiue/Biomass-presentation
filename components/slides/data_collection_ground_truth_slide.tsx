import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { Scan, Box, CheckCircle, Database } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const DataCollectionGroundTruthSlide = forwardRef<SlideHandle, SlideProps>(({ isActive }, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const containerVarients = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVarients = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="w-full h-full flex flex-col bg-background p-6 md:p-12 overflow-hidden relative">

            {/* Background Grid */}
            <div
                className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />


            <div className="flex flex-col md:flex-row gap-8 h-full relative z-10">

                {/* Left Column: Key Content */}
                <motion.div
                    className="w-full md:w-1/3 space-y-6"
                    variants={containerVarients}
                    initial="hidden"
                    animate={isActive ? "show" : "hidden"}
                >

                    {/* Header */}
                    <div className="relative z-10 w-full flex justify-between items-end border-b border-gray-200 pb-6 mb-8">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-warning mb-2">
                                Data Collection
                            </h1>
                            <h2 className="text-xl md:text-2xl text-muted font-light">The Ground Truth (LiDAR)</h2>
                        </div>
                    </div>

                    {/* Step 1: The Truth */}
                    <motion.div variants={itemVarients} className="bg-surface border border-gray-200 p-5 rounded-xl hover:border-warning/50 hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-2">
                            <Scan className="text-warning" size={20} />
                            <h3 className="font-bold text-foreground">1. The Answer Key (LiDAR)</h3>
                        </div>
                        <p className="text-muted text-sm">
                            We needed to know the <strong>actual</strong> weight of the forest to teach the AI. We flew planes with lasers (LiDAR) over 8.5 million hectares of Finland to create a perfect 3D map of every tree.
                        </p>
                    </motion.div>

                    {/* Step 2: The Input */}
                    <motion.div variants={itemVarients} className="bg-surface border border-gray-200 p-5 rounded-xl hover:border-warning/50 hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-2">
                            <Database className="text-warning" size={20} />
                            <h3 className="font-bold text-foreground">2. The Satellite "Eyes"</h3>
                        </div>
                        <p className="text-muted text-sm">
                            We used two satellites to watch the forest for a full year.
                            <br />
                            • <strong>Sentinel-2:</strong> Takes normal photos (Color).
                            <br />
                            • <strong>Sentinel-1:</strong> Uses Radar to see through clouds.
                        </p>
                    </motion.div>

                    {/* Step 3: The Assembly */}
                    <motion.div variants={itemVarients} className="bg-surface border border-gray-200 p-5 rounded-xl hover:border-warning/50 hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-2">
                            <Box className="text-warning" size={20} />
                            <h3 className="font-bold text-foreground">3. Making the Puzzle</h3>
                        </div>
                        <p className="text-muted text-sm">
                            We cleaned up the satellite images (removing clouds) and chopped the map into <strong>310,000</strong> small squares. Each square is a complete lesson: "Here is the satellite view, and here is the correct biomass."
                        </p>
                    </motion.div>

                </motion.div>

                {/* Right Column: Visuals */}
                <motion.div
                    className="w-full md:w-2/3 flex flex-col gap-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 50 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    {/* Bottom Visual: Main Pipeline Diagram */}
                    <div className="flex-1 relative rounded-xl overflow-hidden border border-gray-200 bg-white group shadow-sm">
                        <div className="absolute top-2 left-3 z-20 bg-surface/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-foreground shadow-sm">
                            FULL DATA PROCESSING PIPELINE
                        </div>
                        <img
                            src="/dataset_info/Finland_Biomass_Dataset.png"
                            alt="Finland Biomass Dataset Pipeline"
                            className="w-full h-full object-contain p-4 mix-blend-multiply"
                        />
                    </div>
                </motion.div>

            </div>
        </div>
    );
});

DataCollectionGroundTruthSlide.displayName = "DataCollectionGroundTruthSlide";
export default DataCollectionGroundTruthSlide;
