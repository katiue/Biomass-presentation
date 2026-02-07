import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";
import { Sparkles, Eye, ArrowRight, Brain, CloudRain, Check, Layers } from "lucide-react";
import Image from "next/image";

// ========================================
// CONFIGURABLE: Which months are cloudy/ignored
// Set the month indices (0-11) that should be marked as "Ignored"
// ========================================
const CLOUDY_MONTHS: number[] = [1, 3, 5]; // <-- CHANGE THIS TO SET IGNORED MONTHS

// Month names for display
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Simulated attention weights (higher = more attention)
// These will auto-decrease for cloudy months
const BASE_ATTENTION_WEIGHTS = [0.3, 0.4, 0.5, 0.7, 0.85, 0.9, 0.95, 0.9, 0.8, 0.6, 0.5, 0.4];

// Fixed low weights for cloudy months (no randomness to avoid hydration issues)
const CLOUDY_WEIGHT = 0.12;

// Calculate actual weights (cloudy months get low attention)
const getAttentionWeight = (monthIdx: number): number => {
    if (CLOUDY_MONTHS.includes(monthIdx)) {
        return CLOUDY_WEIGHT; // Fixed low attention for cloudy months
    }
    return BASE_ATTENTION_WEIGHTS[monthIdx];
};

// Pre-calculate initial weights to ensure consistent server/client rendering
const INITIAL_WEIGHTS = Array.from({ length: 12 }, (_, i) => getAttentionWeight(i));

// // Transformer Architecture Diagram Component
// const TransformerArchitecture = () => {
//     const [activeLayer, setActiveLayer] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setActiveLayer((prev) => (prev + 1) % 8);
//         }, 800);
//         return () => clearInterval(interval);
//     }, []);

//     const layers = [
//         { name: "Input", subtitle: "12 Months", color: "bg-yellow-400", width: 80 },
//         { name: "Pos Encoding", subtitle: "⊕", color: "bg-yellow-500", width: 70 },
//         { name: "LayerNorm", subtitle: "", color: "bg-slate-300", width: 70 },
//         { name: "Multi-Head\nSelf-Attention", subtitle: "4 Heads", color: "bg-amber-300", width: 100, isMain: true },
//         { name: "Add &\nNormalize", subtitle: "", color: "bg-emerald-400", width: 70 },
//         { name: "Feed Forward", subtitle: "(MLP)", color: "bg-amber-300", width: 80 },
//         { name: "Add &\nNormalize", subtitle: "", color: "bg-emerald-400", width: 70 },
//         { name: "Weight\nPooling", subtitle: "", color: "bg-green-500", width: 70 },
//     ];

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-gradient-to-br from-purple-100/80 to-violet-100/80 border-2 border-purple-300 rounded-2xl p-4 shadow-lg"
//         >
//             <div className="text-center mb-3">
//                 <h3 className="font-bold text-purple-700">Transformer Architecture</h3>
//             </div>

//             {/* Simplified Horizontal Flow */}
//             <div className="flex items-center justify-center gap-1 overflow-x-auto pb-2">
//                 {layers.map((layer, idx) => (
//                     <React.Fragment key={idx}>
//                         <motion.div
//                             className={`flex flex-col items-center justify-center rounded-lg text-center px-2 py-2 min-h-[60px] ${layer.color} ${layer.isMain ? "ring-2 ring-amber-500" : ""
//                                 }`}
//                             style={{ minWidth: layer.width }}
//                             animate={{
//                                 scale: activeLayer === idx ? 1.05 : 1,
//                                 boxShadow: activeLayer === idx ? "0 0 20px rgba(139, 92, 246, 0.5)" : "none",
//                             }}
//                             transition={{ duration: 0.3 }}
//                         >
//                             <span className="text-[10px] font-bold text-slate-800 whitespace-pre-line leading-tight">
//                                 {layer.name}
//                             </span>
//                             {layer.subtitle && (
//                                 <span className="text-[8px] text-slate-600">{layer.subtitle}</span>
//                             )}
//                         </motion.div>
//                         {idx < layers.length - 1 && (
//                             <motion.div
//                                 className="text-purple-400"
//                                 animate={{
//                                     scale: activeLayer === idx ? 1.3 : 1,
//                                     color: activeLayer === idx ? "#8b5cf6" : "#c4b5fd",
//                                 }}
//                             >
//                                 →
//                             </motion.div>
//                         )}
//                     </React.Fragment>
//                 ))}
//             </div>

//             {/* Key Component Highlight */}
//             <div className="mt-3 flex justify-center gap-4 text-[9px]">
//                 <div className="flex items-center gap-1">
//                     <div className="w-3 h-3 bg-amber-300 rounded" />
//                     <span className="text-slate-600">Attention/MLP</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                     <div className="w-3 h-3 bg-emerald-400 rounded" />
//                     <span className="text-slate-600">Residual + Norm</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                     <div className="w-3 h-3 bg-green-500 rounded" />
//                     <span className="text-slate-600">Output</span>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// Monthly Satellite Images with Attention Visualization
const MonthlyAttentionGrid = () => {
    const [highlightedMonth, setHighlightedMonth] = useState<number | null>(null);
    // Use pre-calculated weights to avoid hydration mismatch
    const [animatedWeights, setAnimatedWeights] = useState<number[]>(INITIAL_WEIGHTS);

    // No need to animate weights randomly - they're now fixed based on CLOUDY_MONTHS

    return (
        <div className="flex flex-col gap-3">
            <div className="text-center">
                <h3 className="text-sm font-bold text-slate-700 flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4 text-amber-500" />
                    Self-Attention: Which months matter?
                </h3>
                <p className="text-[10px] text-slate-500">
                    Transformer learns to focus on clear months and ignore cloudy ones
                </p>
            </div>

            {/* 12 Month Grid */}
            <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: 12 }).map((_, monthIdx) => {
                    const isCloudy = CLOUDY_MONTHS.includes(monthIdx);
                    const weight = animatedWeights[monthIdx];
                    const isHighWeight = weight > 0.7;

                    return (
                        <motion.div
                            key={monthIdx}
                            className="relative group cursor-pointer"
                            onMouseEnter={() => setHighlightedMonth(monthIdx)}
                            onMouseLeave={() => setHighlightedMonth(null)}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: monthIdx * 0.05 }}
                        >
                            {/* Image Container */}
                            <div
                                className={`relative rounded-lg overflow-hidden border-2 transition-all ${isCloudy
                                    ? "border-red-400 opacity-60"
                                    : isHighWeight
                                        ? "border-emerald-500 ring-2 ring-emerald-400/50"
                                        : "border-slate-300"
                                    }`}
                            >
                                <Image
                                    src={`/assets/s2_${monthIdx}.png`}
                                    alt={`Month ${monthIdx + 1}`}
                                    width={100}
                                    height={100}
                                    className="w-full aspect-square object-cover"
                                />

                                {/* Cloudy Overlay */}
                                {isCloudy && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="absolute inset-0 bg-red-500/30 flex items-center justify-center"
                                    >
                                        <div className="bg-red-600 text-white px-2 py-0.5 rounded text-[8px] font-bold rotate-[-12deg] shadow-lg">
                                            IGNORED
                                        </div>
                                    </motion.div>
                                )}

                                {/* High Attention Badge */}
                                {isHighWeight && !isCloudy && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow"
                                    >
                                        <Check className="w-2.5 h-2.5 text-white" />
                                    </motion.div>
                                )}
                            </div>

                            {/* Month Label */}
                            <div className="text-center mt-1">
                                <span
                                    className={`text-[10px] font-bold ${isCloudy ? "text-red-500" : isHighWeight ? "text-emerald-600" : "text-slate-600"
                                        }`}
                                >
                                    {MONTH_NAMES[monthIdx]}
                                </span>
                            </div>

                            {/* Attention Weight Bar */}
                            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mt-0.5">
                                <motion.div
                                    className={`h-full ${isCloudy ? "bg-red-400" : "bg-emerald-500"}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${weight * 100}%` }}
                                    transition={{ duration: 0.5, delay: monthIdx * 0.05 }}
                                />
                            </div>
                            <div className="text-center">
                                <span className="text-[8px] text-slate-400">{(weight * 100).toFixed(0)}%</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-1.5">
                    <CloudRain className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-[10px] text-red-600 font-medium">Cloudy/Ignored</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] text-emerald-600 font-medium">High Attention</span>
                </div>
            </div>
        </div>
    );
};

const ConceptTransformerSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false,
    }));

    return (
        <div className="flex flex-col h-full p-6 gap-4 overflow-hidden">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-600 text-sm font-medium mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Concept Explained</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-1">
                    What is a <span className="text-amber-500">Transformer</span>?
                </h1>
                <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
                    An AI architecture that uses <strong>Self-Attention</strong> to decide which inputs are important
                </p>
            </motion.div>

            {/* Main Content - Two Column */}
            <div className="flex-1 flex gap-6">
                {/* Left: Key Concepts + Architecture */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-[380px] flex flex-col gap-4"
                >
                    {/* Core Idea Card */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4">
                        <h3 className="font-bold text-base mb-2 flex items-center gap-2">
                            <Brain className="w-5 h-5 text-amber-600" />
                            The Core Idea
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Unlike traditional models that process data <strong>sequentially</strong>, Transformers can
                            look at <strong>all time steps at once</strong> and learn which ones are most useful.
                        </p>
                        <div className="mt-3 p-2 bg-white rounded-lg border border-amber-100">
                            <div className="flex items-center gap-2 text-sm text-amber-700 font-medium">
                                <Eye className="w-4 h-4" />
                                <span>
                                    Key Feature: <strong>Self-Attention Mechanism</strong>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* For Biomass Estimation */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-4">
                        <h4 className="font-bold text-sm mb-2 text-slate-700 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-emerald-500" />
                            For Biomass Estimation
                        </h4>
                        <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs mt-0.5">
                                    1
                                </div>
                                <span>
                                    Input: 12 months of satellite images
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs mt-0.5">
                                    2
                                </div>
                                <span>
                                    Attention: Model learns to <strong className="text-emerald-600">focus</strong> on clear
                                    months
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs mt-0.5">
                                    3
                                </div>
                                <span>
                                    Ignore: <strong className="text-red-500">Cloudy/noisy</strong> months get low attention
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Architecture Diagram */}
                    {/* <TransformerArchitecture /> */}
                </motion.div>

                {/* Right: Monthly Attention Visualization */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex-1 bg-white border border-slate-200 rounded-3xl p-5 shadow-xl flex flex-col"
                >
                    <MonthlyAttentionGrid />

                    {/* Bottom Insight */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-auto pt-4 border-t border-slate-100"
                    >
                        <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                            <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                            <div>
                                <p className="text-sm text-amber-800">
                                    <strong>Key Insight:</strong> The Transformer automatically learns which months contain
                                    useful information for predicting biomass, without being explicitly told which months
                                    are cloudy!
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
});

ConceptTransformerSlide.displayName = "ConceptTransformerSlide";
export default ConceptTransformerSlide;
