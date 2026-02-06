import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";
import { Award, Quote, MapPin } from "lucide-react";

const PaperAcceptanceSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    return (
        <div className="flex h-full p-8 gap-8 overflow-hidden">
            {/* Left: Details */}
            <div className="w-1/2 flex flex-col justify-center space-y-8">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold border border-green-500/20 mb-4">
                        <Award className="w-4 h-4" />
                        <span>Paper Accepted</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-2 text-foreground">Temporal Transformers for Biomass Estimation</h2>
                    <div className="flex items-center text-muted-foreground text-sm mt-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        ICASIS 2026, Hong Kong
                    </div>
                </div>

                <div className="relative p-6 bg-surface/50 border border-border/60 rounded-xl italic text-foreground/80">
                    <Quote className="absolute top-4 left-4 w-6 h-6 text-primary/20" />
                    <p className="pl-6 text-sm leading-relaxed">
                        "This paper... presents a highly efficient hybrid CNN-Transformer framework designed to estimate forest above-ground biomass (AGBM) using multi-temporal satellite data."
                    </p>
                    <div className="mt-4 text-right text-xs font-bold text-primary">
                        — Organizing Committee of ICASIS 2026
                    </div>
                </div>
            </div>

            {/* Right: PDF Preview */}
            <div className="flex-1 bg-surface rounded-2xl border border-border overflow-hidden shadow-2xl relative group">
                {/* Fallback visual if iframe fails/not supported perfectly in all views, though modern browsers handle it */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 z-0">
                    <span className="text-sm">Loading PDF Document...</span>
                </div>

                <iframe
                    src="/model/85 Acceptance Letter.pdf#toolbar=0&navpanes=0&scrollbar=0"
                    className="w-full h-full relative z-10"
                    title="Acceptance Letter"
                />

                {/* Overlay to prevent interaction if desired, or allows scrolling */}
                <div className="absolute inset-0 bg-transparent pointer-events-none border-[6px] border-surface rounded-2xl" />
            </div>
        </div>
    );
});

PaperAcceptanceSlide.displayName = "PaperAcceptanceSlide";
export default PaperAcceptanceSlide;
