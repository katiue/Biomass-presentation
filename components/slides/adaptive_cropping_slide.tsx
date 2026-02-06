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
                    <h2 className="text-4xl font-bold mb-2 text-foreground">Adaptive Cropping?</h2>
                    <h3 className="text-xl text-primary font-mono">Can we exclude the noise intelligently?</h3>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="font-bold text-red-700 dark:text-red-400">Short Answer: No</span>
                    </div>
                    <p className="text-sm text-foreground/80">
                        Land shapes are complex. Box cropping guarantees including noise or excluding data.
                    </p>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold text-lg text-foreground flex items-center gap-2">
                        <Crop className="w-5 h-5 text-primary" />
                        Methodology Explored
                    </h4>

                    <ul className="space-y-3 relative border-l-2 border-primary/20 ml-2 pl-6">
                        <li className="relative">
                            <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-primary" />
                            <h5 className="font-bold text-sm">1. Saliency Map Generation</h5>
                            <p className="text-xs text-muted-foreground">Identifies Regions of Interest (ROI) based on visual importance, variance, and depth.</p>
                        </li>
                        <li className="relative">
                            <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-primary" />
                            <h5 className="font-bold text-sm">2. Multi-Level Partitioning</h5>
                            <p className="text-xs text-muted-foreground">
                                <span className="font-semibold text-primary/80">High-Saliency:</span> Finer blocks for details.<br />
                                <span className="font-semibold text-primary/80">Low-Saliency:</span> Larger blocks for background.
                            </p>
                        </li>
                        <li className="relative">
                            <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-primary" />
                            <h5 className="font-bold text-sm">3. Energy-Based Sampling</h5>
                            <p className="text-xs text-muted-foreground">High energy blocks get higher sampling rates; low energy blocks get lower.</p>
                        </li>
                    </ul>
                </div>

                <div className="bg-surface border border-border/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold text-sm">Benefits</span>
                    </div>
                    <ul className="grid grid-cols-2 gap-2 text-xs text-foreground/80">
                        <li>• Avoids over-sampling empty water</li>
                        <li>• Higher PSNR & SSIM</li>
                        <li>• Prevents blocking artifacts</li>
                        <li>• Optimizes bandwidth</li>
                    </ul>
                </div>

                <a
                    href="https://www.sciencedirect.com/science/article/pii/S2590123025043245"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs text-primary hover:underline mt-2"
                >
                    <ExternalLink className="w-3 h-3" />
                    Reference: Saliency-driven adaptive block partitioning...
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
