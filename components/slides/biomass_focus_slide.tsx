
import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { TreePine, Wind, AreaChart } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const BiomassFocusSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const isActive = props.isActive;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-background p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/assets/forest_bg_faded.png')] opacity-5 bg-cover bg-center pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl z-10"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-8 mx-auto">
                    <TreePine className="w-4 h-4" />
                    <span>THE NATURAL PROXY</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-8 text-foreground">
                    Why focus on <span className="text-primary">Biomass?</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted mb-12 leading-relaxed">
                    <strong className="text-foreground">Above Ground Biomass (AGB)</strong> is our primary focus for stored carbon.
                    By estimating the total mass of trees, we quantify carbon sequestered or lost.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <motion.div
                        className="p-6 bg-surface/50 backdrop-blur-md border border-gray-200 rounded-xl hover:bg-surface transition-colors"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary mb-4">
                            <Wind size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Carbon Sinks</h3>
                        <p className="text-sm text-muted">Forests act as natural carbon sinks through photosynthesis.</p>
                    </motion.div>

                    <motion.div
                        className="p-6 bg-surface/50 backdrop-blur-md border border-gray-200 rounded-xl hover:bg-surface transition-colors"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-green-600 mb-4">
                            <TreePine size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Total Mass</h3>
                        <p className="text-sm text-muted">Direct quantification of organic matter in a given area.</p>
                    </motion.div>

                    <motion.div
                        className="p-6 bg-surface/50 backdrop-blur-md border border-gray-200 rounded-xl hover:bg-surface transition-colors"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                        transition={{ delay: 0.7 }}
                    >
                        <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                            <AreaChart size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Quantification</h3>
                        <p className="text-sm text-muted">Measure loss due to deforestation or wildfires precisely.</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
});

BiomassFocusSlide.displayName = "BiomassFocusSlide";
export default BiomassFocusSlide;
