import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, Trophy, Brain, Box, GitBranch, AlertTriangle, Globe, ArrowRight, ArrowDown, Ruler, Clock, Database } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const CurrentLimitationsSolutionsSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const isActive = props.isActive;

    const limitations = [
        {
            icon: Box,
            color: "text-purple-500",
            title: "Standard CNNs",
            desc: "Treats satellite data like static images.",
            flaw: "IGNORES TIME"
        },
        {
            icon: GitBranch,
            color: "text-blue-500",
            title: "RNNs / LSTMs",
            desc: "Struggles with huge satellite time-series.",
            flaw: "HARD TO TRAIN"
        },
        {
            icon: Cpu,
            color: "text-gray-500",
            title: "Existing SOTA",
            desc: "Uses 'brute force' scaling (EfficientNetV2).",
            flaw: "150M PARAMS"
        }
    ];

    return (
        <div className="w-full h-full flex flex-col bg-background p-6 md:p-10 relative overflow-hidden">

            <div className="flex-1 flex flex-col gap-6 max-w-7xl mx-auto w-full justify-center">

                {/* --- HEADER: THE MOTIVATION --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch min-h-[180px]">

                    {/* 1. Physical Context (The Old Way) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
                        className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col justify-center opacity-70"
                    >
                        <div className="flex items-center gap-2 mb-3 text-muted">
                            <Ruler size={20} />
                            <h3 className="font-bold uppercase tracking-wider text-sm">Physical Surveys</h3>
                        </div>
                        <p className="text-2xl font-light text-gray-600 mb-4">
                            Accurate, but <span className="font-bold text-gray-900">impossible to scale</span>.
                        </p>
                        <div className="flex gap-3 text-xs font-mono text-gray-500">
                            <span className="bg-gray-200 px-2 py-1 rounded">Sparse Data</span>
                            <span className="bg-gray-200 px-2 py-1 rounded">Expensive</span>
                            <span className="bg-gray-200 px-2 py-1 rounded">Once / Decade</span>
                        </div>
                    </motion.div>

                    {/* 2. AI Potential (The New Way) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
                        transition={{ delay: 0.2 }}
                        className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Brain size={120} className="text-primary" />
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-primary">
                            <Zap size={20} />
                            <h3 className="font-bold uppercase tracking-wider text-sm">Why Deep Learning?</h3>
                        </div>
                        <p className="text-2xl font-medium text-gray-800 mb-4 relative z-10">
                            The only path to <span className="text-primary font-bold">Global Scale</span>.
                        </p>
                        <div className="flex gap-3 text-xs font-bold text-primary relative z-10">
                            <span className="bg-primary/10 border border-primary/20 px-2 py-1 rounded flex items-center gap-1">
                                <Globe size={12} /> Global Coverage
                            </span>
                            <span className="bg-primary/10 border border-primary/20 px-2 py-1 rounded flex items-center gap-1">
                                <Clock size={12} /> Live Monitoring
                            </span>
                            <span className="bg-primary/10 border border-primary/20 px-2 py-1 rounded flex items-center gap-1">
                                <Database size={12} /> Data Fusion
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* --- TRANSITION: THE REALITY --- */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4 w-full"
                >
                    <div className="h-px bg-gray-200 flex-1" />
                    <div className="flex items-center gap-2 text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-100 shadow-sm">
                        <AlertTriangle size={14} />
                        <span className="text-xs font-bold uppercase tracking-wide">However, current infrastructure is flawed</span>
                    </div>
                    <div className="h-px bg-gray-200 flex-1" />
                </motion.div>

                {/* --- THE LIMITATIONS --- */}
                <div className="grid grid-cols-3 gap-4">
                    {limitations.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                            transition={{ delay: 0.5 + (idx * 0.1) }}
                            className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm text-center flex flex-col items-center gap-2 hover:border-red-300 transition-colors"
                        >
                            <div className={`p-3 rounded-full bg-gray-50 ${item.color} mb-1`}>
                                <item.icon size={24} />
                            </div>
                            <h4 className="font-bold text-gray-800">{item.title}</h4>
                            <p className="text-xs text-muted max-w-[180px]">{item.desc}</p>
                            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded mt-auto">
                                {item.flaw}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* --- FOOTER: OUR SOLUTION --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
                    transition={{ delay: 0.8 }}
                    className="mt-2"
                >
                    <div className="bg-gradient-to-r from-surface to-surface-highlight border-2 border-primary/30 rounded-2xl p-6 shadow-lg flex items-center justify-between relative overflow-hidden group">
                        <div className="absolute left-0 top-0 h-full w-2 bg-primary" />
                        {/* Glow effect */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />

                        <div className="flex items-center gap-6">
                            <div className="bg-primary text-primary-foreground p-4 rounded-xl shadow-lg shadow-primary/20">
                                <Zap size={32} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Our Solution</div>
                                <h2 className="text-3xl font-bold text-gray-900">Temporal Feature Transformer</h2>
                                <p className="text-muted mt-1">Intelligence over brute force.</p>
                            </div>
                        </div>

                        <div className="flex gap-8 md:gap-12 text-right z-10">
                            <div>
                                <div className="text-xs text-muted uppercase font-bold text-primary/70">Parameters</div>
                                <div className="text-2xl font-bold text-gray-900">-86%</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted uppercase font-bold text-primary/70">RMSE Score</div>
                                <div className="text-2xl font-bold text-gray-900 flex items-center gap-1 justify-end">
                                    <Trophy size={18} className="text-yellow-500" />
                                    27.10
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    )
});

CurrentLimitationsSolutionsSlide.displayName = "CurrentLimitationsSolutionsSlide";
export default CurrentLimitationsSolutionsSlide;
