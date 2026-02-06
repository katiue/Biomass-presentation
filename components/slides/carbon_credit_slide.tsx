
import React, { forwardRef, useImperativeHandle } from "react";
import { motion, useAnimation } from "framer-motion";
import { Leaf, DollarSign, Globe, Cloud, Factory, ArrowRight, TrendingUp, BarChart3, Wind } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const CarbonCreditSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const isActive = props.isActive;

    return (
        <div className="w-full h-full flex bg-background overflow-hidden relative justify-start gap-4">

            {/* --- Left Column: Definition & Context --- */}
            <div className="flex-1 z-10 flex flex-col justify-center p-12 md:p-20 relative max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight text-foreground leading-[0.9]">
                        What is a <br />
                        <span className="flex text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">Credit?</span>
                    </h1>

                    <p className="text-2xl text-muted font-light leading-relaxed max-w-xl mb-12">
                        A Carbon Credit is a permit representing the right to emit <strong className="text-foreground font-semibold">one tonne of CO₂</strong>.
                        It is the <span className="italic font-serif text-primary">currency</span> of climate action.
                    </p>

                    {/* Feature Cards Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <motion.div
                            className="bg-surface/80 backdrop-blur-sm border border-gray-200 p-4 rounded-xl shadow-sm hover:border-primary/50 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Leaf size={18} /></div>
                                <span className="font-bold text-lg">Sequestration</span>
                            </div>
                            <p className="text-md text-muted leading-snug">Created when forests suck up carbon from the atmosphere.</p>
                        </motion.div>

                        <motion.div
                            className="bg-surface/80 backdrop-blur-sm border border-gray-200 p-4 rounded-xl shadow-sm hover:border-primary/50 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><TrendingUp size={18} /></div>
                                <span className="font-bold text-lg">Trading</span>
                            </div>
                            <p className="text-md text-muted leading-snug">Sold on global compliance and voluntary markets.</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* --- Right Column: The "Asset" Visualization --- */}
            <div className="flex-1 relative flex items-center justify-center z-10 p-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative w-full h-full flex items-center justify-center"
                >
                    <img
                        src="/introduction/carbon_credit_introduction.png"
                        alt="Carbon Credit Visualization"
                        className="max-w-[120%] max-h-[120%] object-contain"
                    />
                </motion.div>
            </div>
        </div>
    );
});

CarbonCreditSlide.displayName = "CarbonCreditSlide";
export default CarbonCreditSlide;
