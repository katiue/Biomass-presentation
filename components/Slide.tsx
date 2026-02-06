"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface SlideProps {
    children: ReactNode;
    className?: string;
    isActive: boolean;
}

export default function Slide({ children, className, isActive }: SlideProps) {
    return (
        <motion.div
            className={twMerge(
                "absolute inset-0 flex flex-col items-center justify-center h-screen w-screen",
                className
            )}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.05,
                y: isActive ? 0 : -20,
                pointerEvents: isActive ? "auto" : "none",
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}
