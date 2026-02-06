
import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { TestTube } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const SectionExperiments = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const isActive = props.isActive;

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-background relative overflow-hidden">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-purple-500/10 rounded-full blur-[150px] mix-blend-multiply" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
                transition={{ duration: 0.6 }}
                className="text-center z-10"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center justify-center mb-8"
                >
                    <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                        <TestTube className="w-20 h-20 text-purple-500" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-surface border border-border text-muted text-sm font-medium mb-6">
                        Section 3
                    </div>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tight text-foreground mb-6">
                        Experiments <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                            & Results
                        </span>
                    </h1>
                    <p className="text-2xl text-muted max-w-2xl mx-auto leading-relaxed">
                        Model architecture, training configurations,<br />and experimental findings
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
});

SectionExperiments.displayName = "SectionExperiments";
export default SectionExperiments;
