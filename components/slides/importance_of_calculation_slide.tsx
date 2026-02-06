
import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { Scale, FileText, AlertTriangle, ShieldCheck, Activity, BarChart } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const ImportanceOfCalculationSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const isActive = props.isActive;

    return (
        <div className="w-full h-full flex flex-row bg-background overflow-hidden relative">
            {/* --- Background --- */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-50" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />


            {/* --- Left Content --- */}
            <div className="flex-1 flex flex-col justify-center p-12 md:p-20 z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -50 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-mono mb-8 w-fit">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="uppercase tracking-widest">The Precision Problem</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 text-foreground tracking-tight leading-tight">
                        Why do we need to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Calculate it?</span>
                    </h1>

                    <div className="relative pl-8 border-l-4 border-red-500 mb-12">
                        <blockquote className="text-3xl font-light italic text-foreground/80 leading-normal">
                            "You cannot manage what you cannot measure."
                        </blockquote>
                        <div className="mt-2 text-sm font-mono text-muted uppercase tracking-widest">— Peter Drucker</div>
                    </div>

                    <p className="text-xl text-muted font-light leading-relaxed max-w-lg">
                        Accurate calculations are the <strong className="text-foreground">backbone</strong> of carbon credit markets. Without them, the system collapses.
                    </p>
                </motion.div>
            </div>

            {/* --- Right Visuals --- */}
            <div className="flex-1 flex flex-col justify-center gap-6 p-12 md:p-20 z-10 relative">

                {/* Pillar 1: Policy */}
                <motion.div
                    className="group relative bg-white border border-gray-200 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 50 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileText size={120} className="text-blue-500" />
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <FileText size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">Policy Support</h3>
                    </div>
                    <p className="text-muted text-base leading-relaxed mb-4 relative z-10">
                        Scalable data supports national assessments of forest carbon stocks (NDCs).
                    </p>
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: isActive ? "80%" : 0 }}
                            transition={{ delay: 0.8, duration: 1 }}
                        />
                    </div>
                </motion.div>

                {/* Pillar 2: Accounting */}
                <motion.div
                    className="group relative bg-white border border-gray-200 p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:border-green-500/50 transition-all duration-300"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 50 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <BarChart size={120} className="text-green-500" />
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                            <Scale size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">Carbon Accounting</h3>
                    </div>
                    <p className="text-muted text-base leading-relaxed mb-4 relative z-10">
                        Precise tracking of fluctuations (growth vs. wildfires) is mandatory for market viability.
                    </p>
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-green-500"
                            initial={{ width: 0 }}
                            animate={{ width: isActive ? "95%" : 0 }}
                            transition={{ delay: 1.0, duration: 1 }}
                        />
                    </div>
                </motion.div>

                {/* The Foundation: Trust */}
                <motion.div
                    className="mt-4 p-4 bg-gray-900 rounded-xl flex items-center justify-between text-white shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                    transition={{ delay: 0.7 }}
                >
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="text-emerald-400" />
                        <span className="font-bold tracking-wide">MARKET TRUST</span>
                    </div>
                    <span className="text-xs font-mono text-gray-400">STATUS: SECURED BY ACCURACY</span>
                </motion.div>
            </div>
        </div>
    )
});

ImportanceOfCalculationSlide.displayName = "ImportanceOfCalculationSlide";
export default ImportanceOfCalculationSlide;
