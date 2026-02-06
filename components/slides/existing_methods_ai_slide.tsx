
import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { Brain, CalendarClock, Box, GitBranch } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const ExistingMethodsAISlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const isActive = props.isActive;

    return (
        <div className="w-full h-full flex flex-col md:flex-row bg-background p-8 md:p-16 gap-12 overflow-hidden items-center">

            {/* Left Column: Context */}
            <div className="flex-1 w-full z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -50 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 text-sm font-mono mb-6">
                        <Brain className="w-4 h-4" />
                        <span>THE EVOLUTION</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground tracking-tight">
                        The Shift to <span className="text-purple-600">AI</span>
                    </h1>
                    <p className="text-xl text-muted mb-8 leading-relaxed">
                        Because of physical failures, the field shifted to Deep Learning. However, initial attempts were limited by architecture.
                    </p>
                </motion.div>
            </div>

            {/* Right Column: Approaches */}
            <div className="flex-1 w-full flex flex-col gap-6 max-w-lg z-10">

                {/* CNN Card */}
                <motion.div
                    className="p-6 bg-surface border border-gray-200 rounded-2xl shadow-sm relative overflow-hidden group"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 50 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Box size={100} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <Box className="text-purple-500" /> Standard CNNs
                    </h3>
                    <p className="text-muted text-sm mb-4">Great at seeing <strong>"what"</strong> is on the ground.</p>

                    <div className="flex items-center gap-2 text-xs font-mono text-red-500 bg-red-50 p-2 rounded w-fit">
                        <CalendarClock size={16} />
                        <span>BAD AT TEMPORAL CHANGES</span>
                    </div>
                </motion.div>

                {/* RNN Card */}
                <motion.div
                    className="p-6 bg-surface border border-gray-200 rounded-2xl shadow-sm relative overflow-hidden group"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 50 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <GitBranch size={100} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <GitBranch className="text-blue-500" /> RNNs / LSTMs
                    </h3>
                    <p className="text-muted text-sm mb-4">Designed for sequences.</p>

                    <div className="flex items-center gap-2 text-xs font-mono text-orange-500 bg-orange-50 p-2 rounded w-fit">
                        <CalendarClock size={16} />
                        <span>STRUGGLE WITH LONG-RANGE DEPENDENCIES</span>
                    </div>
                </motion.div>

            </div>
        </div>
    )
});

ExistingMethodsAISlide.displayName = "ExistingMethodsAISlide";
export default ExistingMethodsAISlide;
