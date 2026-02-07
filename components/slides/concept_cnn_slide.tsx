import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";
import { Layers, ArrowRight, Eye, Image as ImageIcon, Brain, Zap, GitBranch } from "lucide-react";

// Neural Network Visualization Component
const NeuralNetworkGraph = () => {
    const [activeLayer, setActiveLayer] = useState(0);

    // Animate through layers
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveLayer((prev) => (prev + 1) % 5);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const layers = [
        { name: "Input", neurons: 6, color: "from-blue-400 to-blue-600", description: "Raw Image Pixels" },
        { name: "Conv 1", neurons: 5, color: "from-emerald-400 to-emerald-600", description: "Edge Detection" },
        { name: "Conv 2", neurons: 4, color: "from-purple-400 to-purple-600", description: "Shapes & Textures" },
        { name: "Conv 3", neurons: 3, color: "from-orange-400 to-orange-600", description: "Object Parts" },
        { name: "Output", neurons: 2, color: "from-pink-400 to-pink-600", description: "Final Prediction" },
    ];

    const layerSpacing = 140;
    const neuronSpacing = 50;
    const neuronRadius = 18;

    return (
        <div className="relative w-full h-[400px] overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 700 400">
                {/* Draw connections */}
                {layers.slice(0, -1).map((layer, layerIdx) => {
                    const nextLayer = layers[layerIdx + 1];
                    const x1 = 50 + layerIdx * layerSpacing + neuronRadius;
                    const x2 = 50 + (layerIdx + 1) * layerSpacing - neuronRadius;

                    return layer.neurons > 0 && nextLayer.neurons > 0
                        ? Array.from({ length: layer.neurons }).flatMap((_, i) =>
                            Array.from({ length: nextLayer.neurons }).map((_, j) => {
                                const y1 = 175 - ((layer.neurons - 1) * neuronSpacing) / 2 + i * neuronSpacing;
                                const y2 = 175 - ((nextLayer.neurons - 1) * neuronSpacing) / 2 + j * neuronSpacing;
                                const isActive = activeLayer >= layerIdx;

                                return (
                                    <motion.line
                                        key={`conn-${layerIdx}-${i}-${j}`}
                                        x1={x1}
                                        y1={y1}
                                        x2={x2}
                                        y2={y2}
                                        stroke={isActive ? "#10b981" : "#e2e8f0"}
                                        strokeWidth={isActive ? 2 : 1}
                                        strokeOpacity={isActive ? 0.6 : 0.3}
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: isActive ? 1 : 0.3 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                );
                            })
                        )
                        : null;
                })}

                {/* Draw neurons */}
                {layers.map((layer, layerIdx) => {
                    const x = 50 + layerIdx * layerSpacing;
                    const isActive = activeLayer >= layerIdx;

                    return Array.from({ length: layer.neurons }).map((_, neuronIdx) => {
                        const y = 175 - ((layer.neurons - 1) * neuronSpacing) / 2 + neuronIdx * neuronSpacing;

                        return (
                            <motion.g key={`neuron-${layerIdx}-${neuronIdx}`}>
                                {/* Glow effect */}
                                {isActive && (
                                    <motion.circle
                                        cx={x}
                                        cy={y}
                                        r={neuronRadius + 8}
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        strokeOpacity={0.3}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                )}
                                <motion.circle
                                    cx={x}
                                    cy={y}
                                    r={neuronRadius}
                                    className={`fill-current`}
                                    initial={{ scale: 0 }}
                                    animate={{
                                        scale: isActive ? 1.1 : 1,
                                        fill: isActive ? "#10b981" : "#94a3b8",
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        filter: isActive ? "drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))" : "none",
                                    }}
                                />
                            </motion.g>
                        );
                    });
                })}

                {/* Layer Labels */}
                {layers.map((layer, layerIdx) => {
                    const x = 50 + layerIdx * layerSpacing;
                    const isActive = activeLayer >= layerIdx;

                    return (
                        <g key={`label-${layerIdx}`}>
                            <text
                                x={x}
                                y={330}
                                textAnchor="middle"
                                className={`text-xs mb-2 font-bold ${isActive ? "fill-emerald-600" : "fill-slate-400"}`}
                            >
                                {layer.name}
                            </text>
                            <text x={x} y={345} textAnchor="middle" className="text-[9px] fill-slate-400">
                                {layer.description}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Active Layer Indicator */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="flex gap-2">
                    {layers.map((layer, idx) => (
                        <motion.div
                            key={idx}
                            className={`w-3 h-3 rounded-full transition-colors ${activeLayer >= idx ? "bg-emerald-500" : "bg-slate-300"
                                }`}
                            animate={{
                                scale: activeLayer === idx ? 1.3 : 1,
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

// Feature Extraction Pipeline
const FeatureExtractionPipeline = () => {
    return (
        <div className="flex items-center justify-center gap-4">
            {[
                { icon: ImageIcon, label: "Raw Image", color: "bg-blue-100 text-blue-600", border: "border-blue-300" },
                { icon: null, label: "→", color: "", border: "" },
                { icon: Layers, label: "Edges", color: "bg-emerald-100 text-emerald-600", border: "border-emerald-300" },
                { icon: null, label: "→", color: "", border: "" },
                { icon: GitBranch, label: "Shapes", color: "bg-purple-100 text-purple-600", border: "border-purple-300" },
                { icon: null, label: "→", color: "", border: "" },
                { icon: Eye, label: "Objects", color: "bg-orange-100 text-orange-600", border: "border-orange-300" },
                { icon: null, label: "→", color: "", border: "" },
                { icon: Brain, label: "Prediction", color: "bg-pink-100 text-pink-600", border: "border-pink-300" },
            ].map((item, idx) => {
                if (!item.icon) {
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-slate-400 text-xl"
                        >
                            →
                        </motion.div>
                    );
                }
                const Icon = item.icon;
                return (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border ${item.color} ${item.border}`}
                    >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs font-medium">{item.label}</span>
                    </motion.div>
                );
            })}
        </div>
    );
};

const ConceptCNNSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false,
    }));

    return (
        <div className="flex flex-col h-full p-8 gap-6 overflow-hidden">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-600 text-sm font-medium mb-3">
                    <Layers className="w-4 h-4" />
                    <span>Concept Explained</span>
                </div>
                <h1 className="text-5xl font-bold tracking-tight mb-2">
                    What is a <span className="text-purple-500">CNN</span>?
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    <strong>Convolutional Neural Network</strong> — A type of AI that learns to "see" by stacking
                    convolution layers
                </p>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex gap-8">
                {/* Left: Key Concepts */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-[340px] flex flex-col gap-4"
                >
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-2xl p-5">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <Brain className="w-5 h-5 text-purple-600" />
                            The Core Idea
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                            A CNN is like a team of <strong>specialized workers</strong>, each looking for different
                            features:
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                <span>Layer 1: Finds <strong>edges</strong> and lines</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                <span>Layer 2: Combines edges into <strong>shapes</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 rounded-full bg-orange-500" />
                                <span>Layer 3: Recognizes <strong>objects</strong></span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-4">
                        <h4 className="font-bold text-sm mb-3 text-slate-700">Why "Convolutional"?</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            Each layer uses <strong className="text-emerald-600">convolution</strong> (the sliding
                            filter operation) to extract patterns. Multiple convolutions = deeper understanding!
                        </p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl"
                    >
                        <Zap className="w-5 h-5 text-emerald-600" />
                        <div className="text-sm">
                            <strong className="text-emerald-700">Key Benefit:</strong>
                            <span className="text-slate-600"> Learns automatically!</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right: Neural Network Visualization */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex-1 flex flex-col bg-white border border-slate-200 rounded-3xl p-6 shadow-xl"
                >
                    <div className="text-center mb-4">
                        <h3 className="text-lg font-bold text-purple-600">CNN Architecture</h3>
                        <p className="text-xs text-muted-foreground">Watch data flow through the network layers</p>
                    </div>

                    {/* Neural Network Graph */}
                    <div className="flex-1 flex items-center justify-center">
                        <NeuralNetworkGraph />
                    </div>

                    {/* Feature Extraction Pipeline */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                        <div className="text-xs text-center text-slate-500 mb-3">What each layer learns (likely):</div>
                        <FeatureExtractionPipeline />
                    </div>
                </motion.div>
            </div>
        </div>
    );
});

ConceptCNNSlide.displayName = "ConceptCNNSlide";
export default ConceptCNNSlide;
