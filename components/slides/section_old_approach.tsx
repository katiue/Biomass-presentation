
import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { History } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const SectionOldApproach = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const isActive = props.isActive;

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-background relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-orange-500/10 rounded-full blur-[150px] mix-blend-multiply" />
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
                    <div className="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/20">
                        <History className="w-20 h-20 text-orange-500" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-surface border border-border text-muted text-sm font-medium mb-6">
                        Section 3.1
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground mb-6">
                        Old <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                            Approach
                        </span>
                    </h1>
                    <p className="text-2xl text-muted max-w-3xl mx-auto leading-relaxed mb-8">
                        Experiment to see what truly affect biomass estimation
                    </p>

                    <div className="inline-block px-6 py-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-600 font-medium">
                        NOTE: This is the old approach used for testing, not the final result.
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
});

SectionOldApproach.displayName = "SectionOldApproach";
export default SectionOldApproach;
