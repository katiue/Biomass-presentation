import React, { forwardRef, useImperativeHandle, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Zap, Maximize, ArrowRight, Brain, ScanFace, Globe2, Layers } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const FutureWorkSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    const [step, setStep] = useState(0); // 0=Intro, 1=Transformer, 2=Scaling, 3=SSL, 4=Adaptation
    const TOTAL_STEPS = 4;
    const isActive = props.isActive;

    useImperativeHandle(ref, () => ({
        next: () => {
            if (step < TOTAL_STEPS) {
                setStep(s => s + 1);
                return true;
            }
            return false;
        },
        prev: () => {
            if (step > 0) {
                setStep(s => s - 1);
                return true;
            }
            return false;
        }
    }));

    const cards = [
        {
            id: 1,
            title: "Advanced Transformers",
            subtitle: "Architecture",
            icon: Brain,
            color: "text-primary",
            bg: "bg-primary/10",
            border: "hover:border-primary/30",
            desc: "New attention mechanisms (FlashAttention) to capture sparse phenology patterns."
        },
        {
            id: 2,
            title: "Scaling Laws",
            subtitle: "Performance",
            icon: Maximize,
            color: "text-blue-500",
            bg: "bg-blue-100",
            border: "hover:border-blue-200",
            desc: "Increasing dataset size to 1M+ chips and parameters to 100M+ for SOTA results."
        },
        {
            id: 3,
            title: "Self-Supervised Learning",
            subtitle: "Data Scarcity",
            icon: Layers,
            color: "text-purple-500",
            bg: "bg-purple-100",
            border: "hover:border-purple-200",
            desc: "Pre-training on massive unlabeled satellite imagery (SatMAE) to learn general features. This approach is being taken by big name such as Google for building and AI called Alpha Earth."
        },
        {
            id: 4,
            title: "Cross-Biome Adaptation",
            subtitle: "Generalization",
            icon: Globe2,
            color: "text-emerald-600",
            bg: "bg-emerald-100",
            border: "hover:border-emerald-200",
            desc: "Few-shot learning to adapt the Boreal model to Can Gio/Amazon basins without new Ground Truth."
        }
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-start bg-background p-6 md:p-10 relative overflow-hidden">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
                className="text-center mb-10 h-[100px]"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-4">
                    <TrendingUp size={16} />
                    Roadmap
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                    Future Directions
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full h-[550px]">
                {cards.map((card, idx) => {
                    const show = step >= card.id;

                    return (
                        <div key={card.id} className="relative w-full h-full">
                            {/* Empty State */}
                            <div className="absolute inset-0 bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl flex items-center justify-center -z-10 transition-all duration-500"
                                style={{ opacity: show ? 0 : 1 }}
                            >
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-300 font-bold">{card.id}</span>
                                </div>
                            </div>

                            <AnimatePresence>
                                {show && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20, rotateY: -10 }}
                                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                                        className={`absolute inset-0 group bg-gradient-to-br from-surface to-surface-highlight border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all ${card.border}`}
                                    >
                                        <div className="flex items-start justify-between mb-6">
                                            <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center ${card.color} group-hover:scale-110 transition-transform shadow-inner`}>
                                                <card.icon size={28} />
                                            </div>
                                            <div className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold uppercase tracking-wider text-muted">
                                                {card.subtitle}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{card.title}</h3>
                                        <p className="text-muted leading-relaxed">
                                            {card.desc}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </div>

            {/* Stepper Dots */}
            <div className="flex gap-2 mt-12">
                {cards.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ease-out ${i < step ? "w-12 bg-primary" : "w-12 bg-gray-200"}`}
                    />
                ))}
            </div>

        </div>
    );
});

FutureWorkSlide.displayName = "FutureWorkSlide";
export default FutureWorkSlide;
