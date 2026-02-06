
import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { DollarSign, Map, ZapOff, Minimize2, Layers } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const ExistingMethodsLimitationsSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const isActive = props.isActive;

    const cards = [
        {
            title: "High Cost",
            icon: DollarSign,
            color: "text-red-500",
            bg: "bg-red-500/10",
            desc: "Prohibitively expensive to survey large areas repeatedly."
        },
        {
            title: "Low Coverage",
            icon: Map,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            desc: "Sparse measurements providing only a 'snapshot' in time."
        },
        {
            title: "Saturation Issues",
            icon: ZapOff,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            desc: "SAR backscatter hits a limit in dense forests, failing to distinguish high biomass."
        },
        {
            title: "Data Integration",
            icon: Layers,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            desc: "Notoriously difficult to combine radar and optical images coherently."
        }
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-background p-8 md:p-16 relative">

            <motion.div
                className="text-center mb-12 max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-mono mb-4">
                    <Minimize2 className="w-4 h-4" />
                    <span>SCALABILITY BOTTLENECK</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                    Why were they <span className="text-red-500">Ineffective?</span>
                </h1>
                <p className="text-lg text-muted">
                    Traditional methods fail at scale. They are expensive, sparse, and scientifically limited in dense vegetation.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9, y: isActive ? 0 : 20 }}
                        transition={{ delay: 0.3 + (idx * 0.1) }}
                        className="bg-surface border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow flex items-start gap-4"
                    >
                        <div className={`p-3 rounded-lg ${card.bg} ${card.color}`}>
                            <card.icon size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-foreground">{card.title}</h3>
                            <p className="text-sm text-muted leading-snug">{card.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
});

ExistingMethodsLimitationsSlide.displayName = "ExistingMethodsLimitationsSlide";
export default ExistingMethodsLimitationsSlide;
