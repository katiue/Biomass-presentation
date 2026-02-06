import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Leaf, Target, ArrowRight } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const ConclusionSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const isActive = props.isActive;

    const takeaways = [
        {
            icon: <Leaf className="w-6 h-6 text-green-500" />,
            title: "Scalable AGB Estimation",
            text: "Developed a cost-effective, global-scale solution using open satellite data.",
            color: "bg-green-500/10 text-green-500 border-green-500/20"
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
            title: "State-of-the-Art Performance",
            text: "Achieved 27.1 RMSE with our novel temporal-spatial UNetVFLOW architecture.",
            color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
        },
        {
            icon: <Target className="w-6 h-6 text-purple-500" />,
            title: "Data-Driven Carbon Credits",
            text: "Enabling transparent and verifiable carbon credit trading for a better future.",
            color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
        }
    ];

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-background relative overflow-hidden p-8 md:p-16">

            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] mix-blend-multiply" />
            </div>

            <div className="max-w-6xl w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Column: Title & Main Message */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-500 text-sm font-medium mb-6">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Project Wrap-up</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
                        Empowering <br />
                        Two <span className="text-teal-500">Green</span> Futures
                    </h1>

                    <p className="text-xl text-muted leading-relaxed mb-8 max-w-lg">
                        We have successfully demonstrated that deep learning can bridge the gap between satellite data and precise biomass estimation, unlocking a more transparent carbon market.
                    </p>

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-foreground">33M+</span>
                            <span className="text-sm text-muted">Parameters</span>
                        </div>
                        <div className="w-px h-12 bg-border mx-2" />
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-foreground">27.1</span>
                            <span className="text-sm text-muted">RMSE Score</span>
                        </div>
                        <div className="w-px h-12 bg-border mx-2" />
                        <div className="flex flex-col gap-1">
                            <span className="text-3xl font-bold text-foreground">Global</span>
                            <span className="text-sm text-muted">Scalability</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Key Takeaways Cards */}
                <div className="flex flex-col gap-6">
                    {takeaways.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            className="p-6 rounded-2xl bg-surface/80 backdrop-blur-sm border border-border shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl ${item.color}`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted leading-relaxed">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 text-center text-muted/50 text-sm font-mono uppercase tracking-widest"
            >
                Thank You
            </motion.div>

        </div>
    );
});

ConclusionSlide.displayName = "ConclusionSlide";
export default ConclusionSlide;
