import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";
import { Sparkles, Layers, ArrowRight, Plus, Brain, Scale, Zap, Target } from "lucide-react";

// Component descriptions for tooltips/explanations
const COMPONENTS = [
    {
        id: "input",
        name: "Input",
        subtitle: "12 Monthly Images",
        color: "bg-yellow-400",
        borderColor: "border-yellow-500",
        icon: Layers,
        description: "Image of 12 months are fed as a sequence to the Transformer.",
        analogy: "Like reading 12 books about one location.",
    },
    {
        id: "pos-encoding",
        name: "Positional Encoding",
        subtitle: "⊕ Add Position Info",
        color: "bg-yellow-500",
        borderColor: "border-yellow-600",
        icon: Target,
        description: "Tells the model WHEN each image was taken (which month).",
        analogy: "Adding page numbers so the model knows the order.",
    },
    {
        id: "layer-norm",
        name: "Layer Norm",
        subtitle: "Normalize",
        color: "bg-slate-300",
        borderColor: "border-slate-400",
        icon: Scale,
        description: "Standardizes the data to have similar ranges, making training stable.",
        analogy: "Like converting all measurements to the same unit. Instead of comparing 10lb to 5kg, we compare 4.5kg to 5kg.",
    },
    {
        id: "attention",
        name: "Multi-Head Self-Attention",
        subtitle: "4 Parallel Heads",
        color: "bg-amber-300",
        borderColor: "border-amber-500",
        icon: Brain,
        isMain: true,
        description: "The core! Each 'head' learns different relationships between months.",
        analogy: "4 experts each looking for different patterns (clouds, seasons, etc.).",
        details: [
            "Head 1: Might learn to compare summer vs winter",
            "Head 2: Might detect cloudy months",
            "Head 3: Might find seasonal vegetation patterns",
            "Head 4: Might identify anomalies",
        ],
    },
    {
        id: "add-norm-1",
        name: "Add & Normalize",
        subtitle: "Residual Connection",
        color: "bg-emerald-400",
        borderColor: "border-emerald-500",
        icon: Plus,
        description: "Adds the original input back (skip connection) + normalizes.",
        analogy: "Keeping the original info while adding new insights.",
    },
    {
        id: "ffn",
        name: "Feed Forward",
        subtitle: "MLP Network",
        color: "bg-amber-300",
        borderColor: "border-amber-500",
        icon: Zap,
        description: "A neural network that processes each position independently.",
        analogy: "Each month gets individually analyzed by a small brain.",
    },
    {
        id: "add-norm-2",
        name: "Add & Normalize",
        subtitle: "Residual Connection",
        color: "bg-emerald-400",
        borderColor: "border-emerald-500",
        icon: Plus,
        description: "Another skip connection to preserve information flow.",
        analogy: "Insurance policy - never lose the original data.",
    },
    {
        id: "pooling",
        name: "Weight Pooling",
        subtitle: "Combine & Output",
        color: "bg-green-500",
        borderColor: "border-green-600",
        icon: Target,
        description: "Combines all 12 months into a single prediction using learned weights.",
        analogy: "Taking a weighted vote from all months to get the final answer.",
    },
];

const ConceptTransformerArchitectureSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    const [activeComponent, setActiveComponent] = useState(0);

    // Expose Navigation Control - arrow keys and clicks navigate through components
    useImperativeHandle(ref, () => ({
        next: () => {
            if (activeComponent < COMPONENTS.length - 1) {
                setActiveComponent((prev) => prev + 1);
                return true; // Handled internally
            }
            return false; // Let parent move to next slide
        },
        prev: () => {
            if (activeComponent > 0) {
                setActiveComponent((prev) => prev - 1);
                return true; // Handled internally
            }
            return false; // Let parent move to prev slide
        },
    }));

    // Reset when slide becomes active
    useEffect(() => {
        if (props.isActive) {
            setActiveComponent(0);
        }
    }, [props.isActive]);

    const active = COMPONENTS[activeComponent];

    return (
        <div className="flex flex-col h-full p-6 gap-4 overflow-hidden">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-600 text-sm font-medium mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Architecture Deep Dive</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-1">
                    <span className="text-purple-500">How</span> Does The Transformer Work?
                </h1>
                <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
                    Use <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-xs font-mono">→</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-xs font-mono">←</kbd> arrow keys or click to navigate
                </p>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex gap-6">
                {/* Left: Architecture Flow */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-[500px] bg-gradient-to-br from-purple-50/80 to-violet-50/80 border-2 border-purple-200 rounded-3xl p-5 shadow-lg"
                >
                    <div className="text-center mb-4">
                        <h3 className="font-bold text-purple-700">Transformer Pipeline</h3>
                        <p className="text-xs text-slate-500">Data flows from left to right</p>
                    </div>

                    {/* Architecture Flow Diagram */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {COMPONENTS.map((comp, idx) => {
                            const Icon = comp.icon;
                            const isActive = activeComponent === idx;

                            return (
                                <React.Fragment key={comp.id}>
                                    <motion.div
                                        className={`relative flex flex-col items-center justify-center rounded-xl text-center p-3 cursor-pointer transition-all ${comp.color} ${comp.isMain ? "ring-2 ring-amber-600" : ""
                                            } ${isActive ? "ring-4 ring-purple-500 shadow-xl scale-105" : "hover:scale-102"}`}
                                        style={{ minWidth: comp.isMain ? 130 : 90, minHeight: 70 }}
                                        onClick={() => {
                                            setActiveComponent(idx);
                                        }}
                                        animate={{
                                            boxShadow: isActive ? "0 0 25px rgba(139, 92, 246, 0.5)" : "none",
                                        }}
                                    >
                                        <Icon className={`w-4 h-4 mb-1 ${isActive ? "text-purple-700" : "text-slate-700"}`} />
                                        <span className="text-[10px] font-bold text-slate-800 leading-tight">
                                            {comp.name}
                                        </span>
                                        <span className="text-[8px] text-slate-600">{comp.subtitle}</span>

                                        {/* Active indicator */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-purple-500"
                                            />
                                        )}
                                    </motion.div>

                                    {/* Arrow */}
                                    {idx < COMPONENTS.length - 1 && (
                                        <motion.div
                                            animate={{
                                                color: activeComponent === idx ? "#8b5cf6" : "#94a3b8",
                                                scale: activeComponent === idx ? 1.3 : 1,
                                            }}
                                        >
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* Layer indicator */}
                    <div className="mt-4 flex justify-center gap-2">
                        <div className="px-3 py-1 bg-purple-200/50 border border-purple-300 rounded-full text-[10px] text-purple-700">
                            Layer 1
                        </div>
                        <div className="text-slate-400 text-xs">×2 Layers</div>
                        <div className="px-3 py-1 bg-purple-200/50 border border-purple-300 rounded-full text-[10px] text-purple-700">
                            Layer 2
                        </div>
                    </div>

                    {/* Progress dots */}
                    <div className="flex justify-center gap-1.5 mt-4">
                        {COMPONENTS.map((_, idx) => (
                            <motion.button
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-colors ${activeComponent === idx ? "bg-purple-500" : "bg-slate-300"
                                    }`}
                                onClick={() => {
                                    setActiveComponent(idx);
                                }}
                                animate={{ scale: activeComponent === idx ? 1.3 : 1 }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Right: Component Details */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl flex flex-col"
                >
                    {/* Component Header */}
                    <motion.div
                        key={active.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`p-3 rounded-xl ${active.color} ${active.borderColor} border-2`}>
                                <active.icon className="w-6 h-6 text-slate-800" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">{active.name}</h2>
                                <p className="text-sm text-slate-500">{active.subtitle}</p>
                            </div>
                            <div className="ml-auto text-sm text-slate-400 font-mono">
                                {activeComponent + 1}/{COMPONENTS.length}
                            </div>
                        </div>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        key={`desc-${active.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex-1 space-y-4"
                    >
                        {/* What it does */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <h4 className="font-bold text-sm text-slate-700 mb-2 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-amber-500" />
                                What It Does
                            </h4>
                            <p className="text-slate-600 leading-relaxed">{active.description}</p>
                        </div>

                        {/* Analogy */}
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                            <h4 className="font-bold text-sm text-purple-700 mb-2 flex items-center gap-2">
                                <Brain className="w-4 h-4 text-purple-500" />
                                Simple Analogy
                            </h4>
                            <p className="text-purple-800 leading-relaxed italic">"{active.analogy}"</p>
                        </div>

                        {/* Extra details for attention heads */}
                        {active.details && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-amber-50 border border-amber-200 rounded-xl p-4"
                            >
                                <h4 className="font-bold text-sm text-amber-700 mb-2 flex items-center gap-2">
                                    <Layers className="w-4 h-4 text-amber-500" />
                                    The 4 Attention Heads
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {active.details.map((detail, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2 text-sm text-amber-800 bg-white rounded-lg p-2"
                                        >
                                            <div className="w-5 h-5 rounded bg-amber-200 flex items-center justify-center text-amber-700 font-bold text-xs">
                                                {idx + 1}
                                            </div>
                                            <span>{detail.split(":")[1]}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Navigation hint */}
                    <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                        <span className="text-sm text-slate-500">
                            Step {activeComponent + 1} of {COMPONENTS.length} — Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-xs font-mono">→</kbd> to continue
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
});

ConceptTransformerArchitectureSlide.displayName = "ConceptTransformerArchitectureSlide";
export default ConceptTransformerArchitectureSlide;
