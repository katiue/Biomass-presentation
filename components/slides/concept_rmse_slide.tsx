import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";
import { Calculator, Target, TrendingDown, ArrowRight, CheckCircle, XCircle, TreePine } from "lucide-react";
import Image from "next/image";

// Example data for biomass predictions (in tons/hectare)
const EXAMPLE_DATA = [
    { id: 1, actual: 120, predicted: 115, location: "Forest A" },
    { id: 2, actual: 85, predicted: 92, location: "Forest B" },
    { id: 3, actual: 200, predicted: 195, location: "Forest C" },
    { id: 4, actual: 45, predicted: 52, location: "Forest D" },
    { id: 5, actual: 150, predicted: 148, location: "Forest E" },
];

// Calculate RMSE step by step
const calculateRMSESteps = (data: typeof EXAMPLE_DATA) => {
    const errors = data.map((d) => d.predicted - d.actual);
    const squaredErrors = errors.map((e) => e * e);
    const meanSquaredError = squaredErrors.reduce((a, b) => a + b, 0) / squaredErrors.length;
    const rmse = Math.sqrt(meanSquaredError);
    return { errors, squaredErrors, meanSquaredError, rmse };
};

const { errors, squaredErrors, meanSquaredError, rmse } = calculateRMSESteps(EXAMPLE_DATA);

const ConceptRMSESlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false,
    }));

    // Auto-cycle through steps
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 5);
        }, 3000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const steps = [
        { name: "Error", formula: "Predicted - Actual", color: "text-blue-600", bg: "bg-blue-50" },
        { name: "Square", formula: "Error²", color: "text-purple-600", bg: "bg-purple-50" },
        { name: "Mean", formula: "Average of Squared", color: "text-orange-600", bg: "bg-orange-50" },
        { name: "Root", formula: "√Mean", color: "text-emerald-600", bg: "bg-emerald-50" },
        { name: "RMSE", formula: "Final Value", color: "text-pink-600", bg: "bg-pink-50" },
    ];

    return (
        <div className="flex flex-col h-full p-6 gap-4 overflow-hidden">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-600 text-sm font-medium mb-2">
                    <Calculator className="w-4 h-4" />
                    <span>Evaluation Metric</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-1">
                    What is <span className="text-pink-500">RMSE</span>?
                </h1>
                <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
                    <strong>Root Mean Square Error</strong> — Measures how far off our predictions are from reality
                </p>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex gap-6">
                {/* Left: Formula Breakdown */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-[380px] flex flex-col gap-4"
                >
                    {/* Formula Card */}
                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 rounded-2xl p-5">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-pink-600" />
                            The Formula
                        </h3>

                        {/* Visual Formula - Using Image */}
                        <div className="bg-white rounded-xl p-4 border border-pink-100 mb-4 flex justify-center">
                            <Image
                                src="/concepts/RMSE_formula.png"
                                alt="RMSE Formula"
                                width={400}
                                height={80}
                                className="object-contain"
                            />
                        </div>

                        {/* Step breakdown */}
                        <div className="space-y-2">
                            {steps.map((step, idx) => (
                                <motion.div
                                    key={step.name}
                                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${activeStep === idx
                                        ? `${step.bg} ring-2 ring-offset-1 ring-${step.color.split("-")[1]}-400`
                                        : "hover:bg-slate-50"
                                        }`}
                                    onClick={() => {
                                        setActiveStep(idx);
                                        setIsAutoPlaying(false);
                                    }}
                                    animate={{ scale: activeStep === idx ? 1.02 : 1 }}
                                >
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep >= idx ? step.color + " bg-white border-2" : "bg-slate-200 text-slate-500"
                                            }`}
                                        style={{
                                            borderColor: activeStep >= idx ? "currentColor" : "transparent",
                                        }}
                                    >
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <span className={`font-bold text-sm ${activeStep === idx ? step.color : "text-slate-600"}`}>
                                            {step.name}
                                        </span>
                                        <span className="text-xs text-slate-400 ml-2">{step.formula}</span>
                                    </div>
                                    {activeStep > idx && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Why RMSE? */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-4">
                        <h4 className="font-bold text-sm mb-2 text-slate-700 flex items-center gap-2">
                            <Target className="w-4 h-4 text-pink-500" />
                            Why Use RMSE?
                        </h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <span>Same units as original data (tons/hectare)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <span>Penalizes large errors more than small ones</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <span>Easy to interpret: lower = better</span>
                            </li>
                        </ul>
                    </div>

                    {/* Result highlight */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl"
                    >
                        <TrendingDown className="w-5 h-5 text-emerald-600" />
                        <div className="text-sm">
                            <strong className="text-emerald-700">Our Model:</strong>
                            <span className="text-slate-600"> RMSE = </span>
                            <span className="font-bold text-emerald-600">27.1 tons/hectare</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right: Interactive Example */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex-1 bg-white border border-slate-200 rounded-3xl p-5 shadow-xl flex flex-col"
                >
                    <div className="text-center mb-4">
                        <h3 className="text-lg font-bold text-slate-700 flex items-center justify-center gap-2">
                            <TreePine className="w-5 h-5 text-emerald-500" />
                            Example: Biomass Predictions
                        </h3>
                        <p className="text-xs text-slate-500">Watch how RMSE is calculated step by step</p>
                    </div>

                    {/* Data Table */}
                    <div className="overflow-x-auto mb-4">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="py-2 px-3 text-left text-slate-500 font-medium">Location</th>
                                    <th className="py-2 px-3 text-center text-slate-500 font-medium">
                                        Actual
                                        <div className="text-[10px] font-normal">(tons/ha)</div>
                                    </th>
                                    <th className="py-2 px-3 text-center text-slate-500 font-medium">
                                        Predicted
                                        <div className="text-[10px] font-normal">(tons/ha)</div>
                                    </th>
                                    <th
                                        className={`py-2 px-3 text-center font-medium transition-colors ${activeStep >= 0 ? "text-blue-600" : "text-slate-300"
                                            }`}
                                    >
                                        Error
                                    </th>
                                    <th
                                        className={`py-2 px-3 text-center font-medium transition-colors ${activeStep >= 1 ? "text-purple-600" : "text-slate-300"
                                            }`}
                                    >
                                        Error²
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {EXAMPLE_DATA.map((row, idx) => (
                                    <motion.tr
                                        key={row.id}
                                        className="border-b border-slate-100"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <td className="py-2 px-3 font-medium text-slate-700">{row.location}</td>
                                        <td className="py-2 px-3 text-center text-emerald-600 font-mono">{row.actual}</td>
                                        <td className="py-2 px-3 text-center text-blue-600 font-mono">{row.predicted}</td>
                                        <td
                                            className={`py-2 px-3 text-center font-mono transition-all ${activeStep >= 0 ? "text-blue-600" : "text-slate-300"
                                                }`}
                                        >
                                            {activeStep >= 0 ? (
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className={errors[idx] >= 0 ? "" : "text-red-500"}
                                                >
                                                    {errors[idx] > 0 ? "+" : ""}
                                                    {errors[idx]}
                                                </motion.span>
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                        <td
                                            className={`py-2 px-3 text-center font-mono transition-all ${activeStep >= 1 ? "text-purple-600" : "text-slate-300"
                                                }`}
                                        >
                                            {activeStep >= 1 ? (
                                                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                    {squaredErrors[idx]}
                                                </motion.span>
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Calculation Steps */}
                    <div className="flex-1 flex flex-col justify-center gap-3">
                        {/* Mean calculation */}
                        <motion.div
                            className={`p-3 rounded-xl border transition-all ${activeStep >= 2 ? "bg-orange-50 border-orange-200" : "bg-slate-50 border-slate-200 opacity-50"
                                }`}
                            animate={{ scale: activeStep === 2 ? 1.02 : 1 }}
                        >
                            <div className="flex items-center gap-2 text-sm">
                                <span className="font-bold text-orange-600">Mean of Squared Errors:</span>
                                {activeStep >= 2 ? (
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono">
                                        ({squaredErrors.join(" + ")}) / {squaredErrors.length} ={" "}
                                        <strong>{meanSquaredError.toFixed(1)}</strong>
                                    </motion.span>
                                ) : (
                                    <span className="text-slate-400">Waiting...</span>
                                )}
                            </div>
                        </motion.div>

                        {/* Square root calculation */}
                        <motion.div
                            className={`p-3 rounded-xl border transition-all ${activeStep >= 3 ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200 opacity-50"
                                }`}
                            animate={{ scale: activeStep === 3 ? 1.02 : 1 }}
                        >
                            <div className="flex items-center gap-2 text-sm">
                                <span className="font-bold text-emerald-600">Square Root:</span>
                                {activeStep >= 3 ? (
                                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono">
                                        √{meanSquaredError.toFixed(1)} = <strong>{rmse.toFixed(2)}</strong>
                                    </motion.span>
                                ) : (
                                    <span className="text-slate-400">Waiting...</span>
                                )}
                            </div>
                        </motion.div>

                        {/* Final RMSE */}
                        <motion.div
                            className={`p-4 rounded-xl border-2 transition-all ${activeStep >= 4
                                ? "bg-gradient-to-r from-pink-50 to-rose-50 border-pink-300"
                                : "bg-slate-50 border-slate-200 opacity-50"
                                }`}
                            animate={{ scale: activeStep === 4 ? 1.03 : 1 }}
                        >
                            <div className="flex items-center justify-center gap-3">
                                {activeStep >= 4 ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-center"
                                    >
                                        <div className="text-sm text-pink-600 font-medium mb-1">Final RMSE</div>
                                        <div className="text-4xl font-bold text-pink-600">
                                            {rmse.toFixed(2)}
                                            <span className="text-lg font-normal text-pink-400 ml-1">tons/ha</span>
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1">
                                            On average, predictions are off by ~{rmse.toFixed(1)} tons/hectare
                                        </div>
                                    </motion.div>
                                ) : (
                                    <span className="text-slate-400 text-sm">Complete all steps to see RMSE</span>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                        <div className="flex gap-1">
                            {steps.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`w-2.5 h-2.5 rounded-full transition-colors ${activeStep === idx ? "bg-pink-500" : "bg-slate-300"
                                        }`}
                                    onClick={() => {
                                        setActiveStep(idx);
                                        setIsAutoPlaying(false);
                                    }}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${isAutoPlaying
                                ? "bg-pink-100 text-pink-700 hover:bg-pink-200"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                        >
                            {isAutoPlaying ? "⏸ Auto-playing" : "▶ Resume"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
});

ConceptRMSESlide.displayName = "ConceptRMSESlide";
export default ConceptRMSESlide;
