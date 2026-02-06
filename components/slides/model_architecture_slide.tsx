import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";
import { Network, GitMerge, Layers, Zap } from "lucide-react";

const ModelArchitectureSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    return (
        <div className="flex h-full p-8 gap-8 overflow-hidden bg-background">
            {/* Left: Visual Architecture */}
            <div className="flex-1 flex flex-col items-center justify-center bg-white/5 rounded-3xl border border-white/10 p-6 relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
                <img
                    src="/model/biomass_model_architecture.png"
                    alt="Model Architecture"
                    className="w-full h-full object-contain rounded-xl shadow-2xl"
                />
            </div>

            {/* Right: Explanation */}
            <div className="w-[450px] xl:w-[500px] flex flex-col justify-center gap-6 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-2 text-foreground tracking-tight">The Sweet Spot</h2>
                    <h3 className="text-xl text-primary font-mono font-medium">Hybrid CNN-Transformer</h3>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                        Our solution, <strong>UnetVFLOW</strong>, perfectly balances high-speed spatial processing with deep temporal understanding.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-4">
                    {/* Card 1: Encoder */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="bg-surface border border-border/50 rounded-2xl p-5 shadow-sm hover:border-blue-500/30 transition-colors group"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 group-hover:scale-110 transition-transform">
                                <Layers className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-foreground">Efficient Encoder</h4>
                                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Scales 0-2</span>
                                <p className="text-sm text-muted-foreground mt-2 leading-snug">
                                    Uses <strong>AttentionPooling</strong> to rapidly digest high-resolution spatial details. It's fast and efficient where pixels matter most.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Connector */}
                    <div className="flex justify-center -my-2 opacity-20">
                        <div className="h-6 w-0.5 bg-foreground" />
                    </div>

                    {/* Card 2: Transformer */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="bg-surface border border-border/50 rounded-2xl p-5 shadow-sm hover:border-yellow-500/30 transition-colors group"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-500 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-foreground">Temporal Transformer</h4>
                                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Scales 3-4</span>

                                <div className="mt-3 p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                                    <p className="text-sm text-foreground/90 italic">
                                        "Save the heavy thinking for last."
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Applied only deep in the network on smaller, semantic features. It understands <strong>time</strong> and <strong>change</strong> without the computational cost of processing every pixel.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
});

ModelArchitectureSlide.displayName = "ModelArchitectureSlide";
export default ModelArchitectureSlide;
