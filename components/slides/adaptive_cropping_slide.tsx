import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";
import { XCircle, Layers, Zap, Crop, ExternalLink } from "lucide-react";

const AdaptiveCroppingSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    return (
        <div className="flex h-full p-8 gap-8 overflow-hidden">
            {/* Left Column: Text Content */}
            <div className="flex-1 flex flex-col justify-center space-y-6">
                <div>
                    <h2 className="text-4xl font-bold mb-2 text-foreground">Can We Use Adaptive Cropping?</h2>
                    <h3 className="text-xl text-primary font-mono">Smart block-based region separation</h3>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="font-bold text-red-700 dark:text-red-400">Short Answer: No</span>
                    </div>
                    <p className="text-sm text-foreground/80">
                        Land shapes are too complex and irregular. Block-based cropping guarantees either including noise or excluding important forest data.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold text-lg text-foreground flex items-center gap-2">
                        <Crop className="w-5 h-5 text-muted-foreground" />
                        The Concept (from Underwater Imaging)
                    </h4>

                    <ul className="space-y-3 relative border-l-2 border-muted/20 ml-2 pl-6">
                        <li className="relative">
                            <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-muted-foreground" />
                            <h5 className="font-bold text-sm">1. Saliency Map Generation</h5>
                            <p className="text-xs text-muted-foreground">Identifies important regions based on visual importance, variance, and depth information.</p>
                        </li>
                        <li className="relative">
                            <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-muted-foreground" />
                            <h5 className="font-bold text-sm">2. Block-Based Partitioning</h5>
                            <p className="text-xs text-muted-foreground">
                                <span className="font-semibold">High-importance:</span> Split into smaller blocks.<br />
                                <span className="font-semibold">Low-importance:</span> Keep as larger blocks.
                            </p>
                        </li>
                        <li className="relative">
                            <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-muted-foreground" />
                            <h5 className="font-bold text-sm">3. Energy-Based Sampling</h5>
                            <p className="text-xs text-muted-foreground">High-energy blocks get more processing; low-energy blocks get less.</p>
                        </li>
                    </ul>
                </div>

                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="font-bold text-sm text-red-700 dark:text-red-400">Why This Fails for Biomass</span>
                    </div>
                    <ul className="space-y-1 text-xs text-foreground/80">
                        <li>• Forest boundaries are <strong>irregular and complex</strong>—not block-aligned</li>
                        <li>• Fixed block sizes can't follow natural forest edges</li>
                        <li>• Either wastes processing on empty areas OR misses forest patches</li>
                        <li>• Creates blocky artifacts that lose critical details</li>
                    </ul>
                </div>

                <a
                    href="https://www.sciencedirect.com/science/article/pii/S2590123025043245"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-md text-blue-500 hover:text-primary hover:underline mt-2"
                >
                    <ExternalLink className="w-3 h-3" />
                    Concept from: Saliency-driven adaptive block partitioning (underwater imaging)
                </a>
            </div>

            {/* Right Column: Visuals */}
            <div className="flex-1 flex items-center justify-center bg-surface rounded-2xl border border-border/50 p-4 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                <img
                    src="/dataset_info/Adaptive_patch_crop.png"
                    alt="Adaptive Cropping Vis"
                    className="w-full h-auto max-h-full object-contain rounded-lg shadow-lg"
                />
                <div className="absolute bottom-4 right-4 bg-black/70 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                    Adaptive Partitioning Visualization
                </div>
            </div>
        </div>
    );
});

AdaptiveCroppingSlide.displayName = "AdaptiveCroppingSlide";
export default AdaptiveCroppingSlide;
