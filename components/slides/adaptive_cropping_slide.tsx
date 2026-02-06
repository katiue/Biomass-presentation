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
                    <h3 className="text-xl text-primary font-mono">Smartly splitting the image based on content</h3>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="font-bold text-red-700 dark:text-red-400">Short Answer: No</span>
                    </div>
                    <p className="text-sm text-foreground/80">
                        Forest shapes are messy. Using squares means we either include empty space or cut off real trees.
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
                            <h5 className="font-bold text-sm">1. Finding Key Areas</h5>
                            <p className="text-xs text-muted-foreground">Finds where the important data is.</p>
                        </li>
                        <li className="relative">
                            <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-muted-foreground" />
                            <h5 className="font-bold text-sm">2. Cutting into Squares</h5>
                            <p className="text-xs text-muted-foreground">
                                <span className="font-semibold">Busy areas:</span> Cut into small squares.<br />
                                <span className="font-semibold">Empty areas:</span> Keep as big squares.
                            </p>
                        </li>
                        <li className="relative">
                            <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-muted-foreground" />
                            <h5 className="font-bold text-sm">3. Biomass-Based Focus</h5>
                            <p className="text-xs text-muted-foreground">High-biomass areas get more attention; others get less.</p>
                        </li>
                    </ul>
                </div>

                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="font-bold text-sm text-red-700 dark:text-red-400">Why This Fails for Biomass</span>
                    </div>
                    <ul className="space-y-1 text-xs text-foreground/80">
                        <li>• Forest edges are curvy, not square</li>
                        <li>• Squares can't fit nature's shapes</li>
                        <li>• We waste computer power on empty dirt or miss real trees</li>
                        <li>• The result looks blocky and misses details</li>
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
