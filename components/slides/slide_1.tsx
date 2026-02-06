"use client";

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Satellite, Calendar, Zap, ArrowRight, Waves, AlignJustify } from "lucide-react";
import { SlideHandle } from "../../types";

const Slide1 = forwardRef<SlideHandle, { isActive: boolean }>(({ isActive }, ref) => {
    // Use pre-generated assets from Chip 0060c0a5
    const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    return (
        <div className="flex flex-col items-center justify-center w-full h-full max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center px-4 py-2 rounded-full slide-panel bg-surface border border-primary/30 shadow-sm mb-4">
                    <Satellite className="w-5 h-5 text-primary mr-2" />
                    <span className="text-primary-foreground font-mono text-sm tracking-wider">CHIP ID: 0060c0a5</span>
                </div>
                <h2 className="text-5xl font-bold mb-4 text-foreground">Input Data Visualization</h2>
                <p className="text-xl text-muted">Standardized 12-Month Satellite Observation Sequence</p>
            </motion.div>

            {/* Grid of 12 Images */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 w-full">
                {months.map((month, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: isActive ? 1 : 0,
                            scale: isActive ? 1 : 0.8,
                            transition: { delay: 0.3 + (i * 0.05) }
                        }}
                        className="group relative aspect-square bg-surface border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all"
                    >
                        {/* Image Asset */}
                        <img
                            src={`/assets/s2_${i}.png`}
                            alt={`Sentinel-2 ${month}`}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />

                        {/* Label */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                            <div className="flex items-center justify-between text-xs text-white/90 font-mono">
                                <span>{month}</span>
                                <span className="text-primary">S2</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="mt-12 p-6 slide-panel bg-surface rounded-2xl border border-gray-200 shadow-sm border-l-4 border-l-primary max-w-2xl text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
                transition={{ delay: 1.0 }}
            >
                <h4 className="text-lg font-bold mb-2 flex items-center text-foreground">
                    <AlignJustify className="w-5 h-5 mr-2 text-primary" />
                    About this Sample
                </h4>
                <p className="text-muted text-sm leading-relaxed">
                    This chip represents a 256x256 pixel area (approx. 2.56km²). The clear seasonal progression allows our model
                    to infer biomass stocks by analyzing phenological changes in the canopy cover across the year.
                </p>
            </motion.div>
        </div>
    );
});

Slide1.displayName = "Slide1";
export default Slide1;
