import React, { forwardRef, useImperativeHandle, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Plane, TrendingUp, AlertCircle, ScanLine, Trees, CheckCircle2, XCircle, DollarSign, Map, ZapOff, Minimize2, Layers } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const ExistingMethodsPhysicalSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {

    // Steps for Interaction:
    // 0: Initial View (human_measure_1.webp)
    // 1: Second View (human_measure_2.png)
    const [step, setStep] = useState(0);
    const isActive = props.isActive;

    // Handle Step Navigation
    useImperativeHandle(ref, () => ({
        next: () => {
            if (step < 1) {
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

    // Reset when slide becomes active
    React.useEffect(() => {
        if (isActive) {
            setStep(0);
        }
    }, [isActive]);

    const limitationCards = [
        { title: "High Cost", icon: DollarSign, color: "text-red-500", bg: "bg-red-500/10", desc: "Expensive to survey repeatedly." },
        { title: "Low Coverage", icon: Map, color: "text-orange-500", bg: "bg-orange-500/10", desc: "Sparse measurements." },
        { title: "Speed", icon: ZapOff, color: "text-green-500", bg: "bg-green-500/10", desc: "SAR fails in dense forests." },
        { title: "Integration", icon: Layers, color: "text-blue-500", bg: "bg-blue-500/10", desc: "Hard to combine radar/optical." }
    ];

    return (
        <div className="w-full h-full flex bg-background gap-6 p-8 px-20 overflow-hidden relative">

            {/* --- LEFT COLUMN: Header, Table, Limitations --- */}
            <div className="w-1/3 flex mt-10 flex-col gap-4 z-10 min-w-[320px] h-full overflow-y-auto custom-scrollbar pr-2">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -30 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-3 mb-1">
                        <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase">
                            Historical Context
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                        The "Old" <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-800">Physical Approaches</span>
                    </h1>
                </motion.div>

                {/* Summary Comparison Table */}
                <motion.div
                    className="mt-4 z-10 shrink-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-[10px] md:text-xs text-left">
                            <thead className="bg-gray-50 text-gray-500 font-mono uppercase tracking-wider">
                                <tr>
                                    <th className="px-4 py-2 font-medium">Feature</th>
                                    <th className="px-4 py-2 font-medium text-orange-600">Human (Manual)</th>
                                    <th className="px-4 py-2 font-medium text-sky-600">LiDAR (Remote Sensing)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="px-4 py-2 font-medium text-gray-700">Initial Cost</td>
                                    <td className="px-4 py-2 text-gray-600">Lower ($0.22 - $0.48/ha)</td>
                                    <td className="px-4 py-2 text-gray-600">Higher ($0.30 - $0.45/ha)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-medium text-gray-700">Recurring Cost</td>
                                    <td className="px-4 py-2 text-red-600 font-medium">High (Stays the same)</td>
                                    <td className="px-4 py-2 text-green-600 font-medium">Very Low ($0.05 - $0.10/ha)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-medium text-gray-700">Accuracy</td>
                                    <td className="px-4 py-2 text-gray-600">High at plot, low landscape</td>
                                    <td className="px-4 py-2 text-gray-600">High (3-9% error at scale)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-medium text-gray-700">Speed</td>
                                    <td className="px-4 py-2 text-gray-600">Slow (weeks/months)</td>
                                    <td className="px-4 py-2 text-gray-600">Fast (days for capture)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-medium text-gray-700">Best For</td>
                                    <td className="px-4 py-2 text-gray-600">Small plots (&lt; 500 ha)</td>
                                    <td className="px-4 py-2 text-gray-600">Large landscapes (&gt; 1,000 ha)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Limitations Grid (Inserted Here) */}
                <motion.div
                    className="flex flex-col gap-2 mt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-red-500/10 w-fit text-red-600 text-[10px] font-mono border border-red-500/20">
                        <Minimize2 size={12} />
                        <span>WHY IT INEFFICIENT?</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {limitationCards.map((card, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-surface border border-gray-200 rounded-lg shadow-sm">
                                <div className={`p-2 rounded-md ${card.bg} ${card.color}`}>
                                    <card.icon size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-foreground">{card.title}</span>
                                    <span className="text-[10px] text-muted leading-tight">{card.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* --- RIGHT COLUMN: Cards (Images) --- */}
            <div className="w-full flex gap-4 z-10 min-h-0 py-8 h-full">
                {/* Card 1: Human (Manual) */}
                <motion.div
                    className="relative flex w-1/2 bg-surface border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col min-h-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="p-4 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-2 shrink-0">
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                                <ClipboardList size={20} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-foreground">Human Field Measurement</h3>
                            </div>
                        </div>

                        {/* Visual Image Toggle */}
                        <div className="flex-1 w-full bg-gray-100 rounded-lg overflow-hidden relative border-2 border-transparent">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={step === 1 ? "view2" : "view1"}
                                    src={step === 1 ? "/introduction/human_measure_2.png" : "/introduction/human_measure_1.webp"}
                                    alt="Human Measurement"
                                    className="w-full h-full object-cover absolute inset-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                {step === 0 && (
                                    <span className="absolute top-2 left-2 text-white text-xl px-2 py-0.5 rounded-full backdrop-blur-sm z-10">
                                        No tree - No carbon credits
                                    </span>
                                )}
                            </AnimatePresence>
                            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm z-10">
                                {step === 1 ? "View 2" : "View 1"}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Card 2: LiDAR */}
                <motion.div
                    className="relative flex-1 bg-surface border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col min-h-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 20 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="p-4 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-2 shrink-0">
                            <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
                                <Plane size={20} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-foreground">LiDAR (Remote Sensing)</h3>
                            </div>
                        </div>

                        {/* Visual Image */}
                        <div className="flex-1 w-full bg-gray-100 rounded-lg overflow-hidden relative border-2 border-transparent">
                            <img
                                src="/introduction/lidar_in_action.webp"
                                alt="LiDAR in Action"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
});

ExistingMethodsPhysicalSlide.displayName = "ExistingMethodsPhysicalSlide";
export default ExistingMethodsPhysicalSlide;
