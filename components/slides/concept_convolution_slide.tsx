import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";
import { Grid3X3, ScanLine, Sparkles, ArrowRight, Eye } from "lucide-react";

// Animated Convolution Demo Component
const ConvolutionDemo = () => {
    const [kernelPos, setKernelPos] = useState({ x: 0, y: 0 });
    const [isAnimating, setIsAnimating] = useState(true);

    // Sample 5x5 input "image" with grayscale values
    const inputGrid = [
        [50, 80, 120, 200, 180],
        [60, 100, 150, 220, 190],
        [70, 130, 180, 240, 200],
        [40, 90, 140, 210, 170],
        [30, 70, 110, 180, 150],
    ];

    // 3x3 Edge Detection Kernel
    const kernel = [
        [-1, -1, -1],
        [-1, 8, -1],
        [-1, -1, -1],
    ];

    // Calculate convolution result at current position
    const calculateConvolution = (px: number, py: number) => {
        let sum = 0;
        for (let ky = 0; ky < 3; ky++) {
            for (let kx = 0; kx < 3; kx++) {
                const imgX = px + kx;
                const imgY = py + ky;
                if (imgY < inputGrid.length && imgX < inputGrid[0].length) {
                    sum += inputGrid[imgY][imgX] * kernel[ky][kx];
                }
            }
        }
        return Math.abs(sum);
    };

    // Animate kernel sliding across image
    useEffect(() => {
        if (!isAnimating) return;
        const interval = setInterval(() => {
            setKernelPos((prev) => {
                let newX = prev.x + 1;
                let newY = prev.y;
                if (newX > 2) {
                    newX = 0;
                    newY = prev.y + 1;
                }
                if (newY > 2) {
                    newY = 0;
                }
                return { x: newX, y: newY };
            });
        }, 1200);
        return () => clearInterval(interval);
    }, [isAnimating]);

    const cellSize = 52;
    const gap = 4;

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Title */}
            <div className="text-center mb-2">
                <h3 className="text-lg font-bold text-primary">Interactive Demo</h3>
                <p className="text-xs text-muted-foreground">Watch the filter slide across the image</p>
            </div>

            <div className="flex items-center gap-8">
                {/* Input Image Grid */}
                <div className="relative">
                    <div className="text-xs text-center mb-2 font-medium text-muted-foreground">Input Image (5×5)</div>
                    <div
                        className="grid relative bg-slate-100 p-2 rounded-xl"
                        style={{
                            gridTemplateColumns: `repeat(5, ${cellSize}px)`,
                            gap: `${gap}px`,
                        }}
                    >
                        {inputGrid.map((row, y) =>
                            row.map((val, x) => (
                                <motion.div
                                    key={`${x}-${y}`}
                                    className="rounded-lg flex items-center justify-center text-xs font-mono font-bold shadow-inner"
                                    style={{
                                        width: cellSize,
                                        height: cellSize,
                                        backgroundColor: `rgb(${val}, ${val}, ${val})`,
                                        color: val > 127 ? "#1e293b" : "#f8fafc",
                                    }}
                                    animate={{
                                        scale:
                                            x >= kernelPos.x &&
                                                x < kernelPos.x + 3 &&
                                                y >= kernelPos.y &&
                                                y < kernelPos.y + 3
                                                ? 1.08
                                                : 1,
                                        boxShadow:
                                            x >= kernelPos.x &&
                                                x < kernelPos.x + 3 &&
                                                y >= kernelPos.y &&
                                                y < kernelPos.y + 3
                                                ? "0 0 12px rgba(34, 197, 94, 0.6)"
                                                : "none",
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {val}
                                </motion.div>
                            ))
                        )}

                        {/* Kernel Overlay */}
                        <motion.div
                            className="absolute border-4 border-emerald-500 rounded-xl pointer-events-none"
                            style={{
                                width: cellSize * 3 + gap * 2 + 8,
                                height: cellSize * 3 + gap * 2 + 8,
                            }}
                            animate={{
                                left: kernelPos.x * (cellSize + gap) + 4,
                                top: kernelPos.y * (cellSize + gap) + 4,
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        />
                    </div>
                </div>

                {/* Multiply Symbol */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl font-bold text-primary">×</span>
                </div>

                {/* Kernel/Filter */}
                <div>
                    <div className="text-xs text-center mb-2 font-medium text-muted-foreground">Filter (3×3)</div>
                    <div
                        className="grid bg-emerald-50 border-2 border-emerald-500 p-2 rounded-xl"
                        style={{
                            gridTemplateColumns: `repeat(3, ${cellSize}px)`,
                            gap: `${gap}px`,
                        }}
                    >
                        {kernel.map((row, y) =>
                            row.map((val, x) => (
                                <div
                                    key={`k-${x}-${y}`}
                                    className={`rounded-lg flex items-center justify-center text-sm font-mono font-bold shadow-sm ${val === 8
                                            ? "bg-emerald-500 text-white"
                                            : "bg-white text-slate-700 border border-slate-200"
                                        }`}
                                    style={{ width: cellSize, height: cellSize }}
                                >
                                    {val}
                                </div>
                            ))
                        )}
                    </div>
                    <div className="text-[10px] text-center mt-2 text-emerald-600 font-medium">Edge Detection</div>
                </div>

                {/* Equals Symbol */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl font-bold text-primary">=</span>
                </div>

                {/* Output Value */}
                <div>
                    <div className="text-xs text-center mb-2 font-medium text-muted-foreground">Output</div>
                    <motion.div
                        className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                        key={`${kernelPos.x}-${kernelPos.y}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {calculateConvolution(kernelPos.x, kernelPos.y)}
                    </motion.div>
                    <div className="text-[10px] text-center mt-2 text-purple-600 font-medium">
                        Position ({kernelPos.x}, {kernelPos.y})
                    </div>
                </div>
            </div>

            {/* Step Description */}
            <motion.div
                className="bg-slate-50 border border-slate-200 rounded-xl px-6 py-3 text-sm text-center max-w-xl"
                key={`desc-${kernelPos.x}-${kernelPos.y}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <span className="text-emerald-600 font-bold">Step:</span> Multiply each value in the green box by the
                filter, then sum all results to get{" "}
                <span className="font-bold text-purple-600">{calculateConvolution(kernelPos.x, kernelPos.y)}</span>
            </motion.div>
        </div>
    );
};

const ConceptConvolutionSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false,
    }));

    return (
        <div className="flex flex-col h-full p-8 gap-6 overflow-hidden">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-600 text-sm font-medium mb-3">
                    <Grid3X3 className="w-4 h-4" />
                    <span>Concept Explained</span>
                </div>
                <h1 className="text-5xl font-bold tracking-tight mb-2">
                    What is <span className="text-emerald-500">Convolution</span>?
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    A mathematical operation that slides a small "filter" across an image to detect patterns
                </p>
            </motion.div>

            {/* Main Content - Two Column */}
            <div className="flex-1 flex gap-8 items-center">
                {/* Left: Simple Explanation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-[320px] flex flex-col gap-4"
                >
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <Eye className="w-5 h-5 text-emerald-600" />
                            Think of it as...
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                            Imagine you have a <strong>magnifying glass</strong> that can only see a small part of a
                            photo at a time. You slide it across the entire photo, and at each position, you ask:
                        </p>
                        <div className="bg-white rounded-xl p-3 border border-emerald-100 text-center">
                            <span className="text-emerald-600 font-bold">"Is there an edge here?"</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl"
                        >
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <ScanLine className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="text-sm">
                                <span className="font-bold">Slide</span> — Filter moves across image
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl"
                        >
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Grid3X3 className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="text-sm">
                                <span className="font-bold">Multiply</span> — Each pixel × filter value
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl"
                        >
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <Sparkles className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="text-sm">
                                <span className="font-bold">Sum</span> — Add all results → one output
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right: Interactive Demo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl"
                >
                    <ConvolutionDemo />
                </motion.div>
            </div>
        </div>
    );
});

ConceptConvolutionSlide.displayName = "ConceptConvolutionSlide";
export default ConceptConvolutionSlide;
