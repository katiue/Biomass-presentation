import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Database, Cpu, Ban, Server, Globe, CloudFog, MapPin, EyeOff } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const LimitationsSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    const [step, setStep] = useState(0); // 0=Intro, 1=Data, 2=Hardware, 3=Bias, 4=Cloud
    const TOTAL_STEPS = 4;
    const isActive = props.isActive;

    // Reset step when slide becomes active/inactive if needed, 
    // but usually we want to keep state if user navigates back and forth.
    // Here we'll reset if coming from a fresh mount or maybe just keep it.
    // Let's keep it simple: Start at 0 on mount.

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

    // Data for the 4 cards
    const cards = [
        {
            id: 1,
            title: "Data Scarcity",
            icon: Database,
            color: "text-red-500",
            bg: "bg-red-100",
            border: "hover:border-red-200",
            content: (
                <ul className="space-y-3">
                    <li className="flex gap-3 text-muted text-sm">
                        <Ban className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <span>
                            Limited to <strong className="text-gray-800">Finland</strong> provider only.
                        </span>
                    </li>
                    <li className="flex gap-3 text-muted text-sm">
                        <Ban className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <span>
                            Global coverage is <strong>&lt; 1%</strong>.
                        </span>
                    </li>
                </ul>
            ),
            footer: "High Overfitting Risk"
        },
        {
            id: 2,
            title: "Hardware Limits",
            icon: Server,
            color: "text-orange-500",
            bg: "bg-orange-100",
            border: "hover:border-orange-200",
            content: (
                <ul className="space-y-3">
                    <li className="flex gap-3 text-muted text-sm">
                        <Cpu className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                        <span>
                            Student Budget = Single GPU.
                        </span>
                    </li>
                    <li className="flex gap-3 text-muted text-sm">
                        <Cpu className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                        <span>
                            Max Batch Size: <strong>2</strong> (Very Noisy Gradients).
                        </span>
                    </li>
                </ul>
            ),
            footer: "Training Stability Issues"
        },
        {
            id: 3,
            title: "Geographic Bias",
            icon: Globe,
            color: "text-blue-500",
            bg: "bg-blue-100",
            border: "hover:border-blue-200",
            content: (
                <ul className="space-y-3">
                    <li className="flex gap-3 text-muted text-sm">
                        <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <span>
                            Trained only on <strong>Boreal Forests</strong>.
                        </span>
                    </li>
                    <li className="flex gap-3 text-muted text-sm">
                        <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <span>
                            Unable to test on other environments due to lack of data.
                        </span>
                    </li>
                </ul>
            ),
            footer: "Lack of Generalization"
        },
        {
            id: 4,
            title: "Optical Dependency",
            icon: CloudFog,
            color: "text-gray-500",
            bg: "bg-gray-200",
            border: "hover:border-gray-300",
            content: (
                <ul className="space-y-3">
                    <li className="flex gap-3 text-muted text-sm">
                        <EyeOff className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                        <span>
                            Sentinel-2 requires <strong>Clear Skies</strong>.
                        </span>
                    </li>
                    <li className="flex gap-3 text-muted text-sm">
                        <EyeOff className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                        <span>
                            Tropics are cloudy <strong>60-80%</strong> of the year.
                        </span>
                    </li>
                </ul>
            ),
            footer: "Data Gaps"
        }
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-background p-6 md:p-10 relative overflow-hidden">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
                className="text-center mb-10 h-[100px]" // Fixed height to prevent jump
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-bold uppercase tracking-widest mb-4">
                    <AlertTriangle size={16} />
                    Current Constraints
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                    Project Limitations
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full h-[500px]">
                {cards.map((card, idx) => {
                    const show = step >= card.id;
                    const isNext = step === card.id - 1; // The one about to be revealed

                    return (
                        <div key={card.id} className="relative w-full h-full"> {/* Container to hold layout */}

                            {/* Placeholder / Empty State (Optional: could show a '?' box) */}
                            <div className="absolute inset-0 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center -z-10">
                                <span className="text-gray-200 text-6xl font-black opacity-20">{card.id}</span>
                            </div>

                            <AnimatePresence>
                                {show && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, y: 20, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ type: "spring", bounce: 0.4 }}
                                        className={`absolute inset-0 group bg-surface border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all ${card.border} flex flex-col`}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-10 h-10 ${card.bg} rounded-lg flex items-center justify-center ${card.color}`}>
                                                <card.icon size={20} />
                                            </div>
                                            <span className="text-xs font-mono text-muted opacity-50">0{card.id}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>

                                        <div className="flex-1">
                                            {card.content}
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-mono text-muted uppercase">
                                            <span>Impact</span>
                                            <span className={`bg-gray-100 px-2 py-1 rounded font-bold ${card.color.replace('text-', 'text-opacity-80 decoration-')}`}>
                                                {card.footer}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Stepper Dots */}
            <div className="flex gap-2 mt-8">
                {cards.map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 rounded-full transition-all duration-300 ${i < step ? "w-8 bg-primary" : "w-2 bg-gray-200"}`}
                    />
                ))}
            </div>

        </div>
    );
});

LimitationsSlide.displayName = "LimitationsSlide";
export default LimitationsSlide;
