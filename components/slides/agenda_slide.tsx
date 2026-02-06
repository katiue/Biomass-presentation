
import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Database, TestTube, Waypoints, ArrowRight, Milestone, Flag } from "lucide-react";
import { SlideHandle, SlideProps } from "../../types";

const AgendaSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const isActive = props.isActive;

    const agendaItems = [
        {
            id: 1,
            title: "Problem Statement",
            description: "Carbon credits, biomass estimation, and current limitations.",
            icon: <AlertCircle size={32} />,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20"
        },
        {
            id: 2,
            title: "Dataset Overview",
            description: "The BioMassters dataset: Sentinel-1, Sentinel-2, and LiDAR.",
            icon: <Database size={32} />,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            id: 3,
            title: "Methodology & Experiments",
            description: "Temporal & spatial models, configurations, and results.",
            icon: <TestTube size={32} />,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20"
        },
        {
            id: 4,
            title: "AI Pipeline",
            description: "End-to-end processing workflow and demonstration.",
            icon: <Waypoints size={32} />,
            color: "text-green-500",
            bg: "bg-green-500/10",
            border: "border-green-500/20"
        },
        {
            id: 5,
            title: "Limitations & Future Work",
            description: "Addressing constraints and defining the path forward.",
            icon: <Milestone size={32} />,
            color: "text-rose-500",
            bg: "bg-rose-500/10",
            border: "border-rose-500/20"
        },
        {
            id: 6,
            title: "Conclusion",
            description: "Summary of key findings and final thoughts.",
            icon: <Flag size={32} />,
            color: "text-teal-500",
            bg: "bg-teal-500/10",
            border: "border-teal-500/20"
        }
    ];

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-background relative overflow-hidden p-12">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] mix-blend-multiply" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -20 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-6 z-10"
            >
                <div className="inline-block px-4 py-1.5 rounded-full bg-surface border border-border text-muted text-sm font-medium mb-4">
                    Overview
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
                    Presentation <span className="text-primary">Agenda</span>
                </h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full z-10">
                {agendaItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9, y: isActive ? 0 : 20 }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                        className={`group relative p-6 rounded-2xl bg-surface/50 backdrop-blur-md border ${item.border} hover:bg-surface hover:shadow-lg transition-all duration-300 cursor-default`}
                    >
                        <div className="flex items-start gap-4 h-full">
                            <div className={`p-4 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                {item.icon}
                            </div>
                            <div className="flex-1 flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                            {item.id}. {item.title}
                                        </h3>
                                        <ArrowRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <p className="text-muted text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
});

AgendaSlide.displayName = "AgendaSlide";
export default AgendaSlide;
