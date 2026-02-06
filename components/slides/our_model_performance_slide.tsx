import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";

import { Zap, CheckCircle2, TrendingDown, Gauge } from "lucide-react";

const OurModelPerformanceSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const comparisonData = [
        { name: "EffNetV2-L (Winner - Ours)", size: 150, score: 27.63, color: '#2E86AB', shape: 'circle' },
        { name: "Our UnetVFLOW", size: 33, score: 27.1, color: '#10B981', opacity: 1.0 },
        { name: "Swin UNETR", size: 40, score: 27.68, color: '#A23B72', shape: 'square' },
        { name: "Ensemble (15 EffNet-B4)", size: 50, score: 28.04, color: '#F18F01', shape: 'triangle' },
    ];

    return (
        <div className="flex h-full p-8 gap-8 overflow-hidden">
            {/* Left: Performance Highlights */}
            <div className="w-[450px] flex flex-col justify-center gap-8 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-bold mb-2 text-foreground tracking-tight">Our Solution</h2>
                    <h3 className="text-xl text-emerald-500 font-mono font-medium">Efficient & Accurate</h3>
                </motion.div>

                <div className="flex flex-col gap-6">
                    {/* Stats Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {/* Model Size */}
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Gauge className="w-5 h-5 text-blue-500" />
                                <span className="text-xs font-mono text-blue-700 dark:text-blue-400 uppercase tracking-wider">Size</span>
                            </div>
                            <div className="text-3xl font-bold text-foreground">33M</div>
                            <div className="text-xs text-muted-foreground mt-1">Parameters</div>
                        </div>

                        {/* RMSE */}
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingDown className="w-5 h-5 text-emerald-500" />
                                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">RMSE</span>
                            </div>
                            <div className="text-3xl font-bold text-foreground">27.1</div>
                            <div className="text-xs text-muted-foreground mt-1">Mg ha⁻¹</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-xl text-foreground">The Winning Formula</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-foreground/80 leading-relaxed">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <span><strong className="text-emerald-600 dark:text-emerald-400">4.5× smaller</strong> than the competition winner</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <span><strong className="text-emerald-600 dark:text-emerald-400">Better accuracy</strong> (0.53 RMSE improvement)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <span><strong className="text-emerald-600 dark:text-emerald-400">Faster inference</strong> for real-time applications</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <span><strong className="text-emerald-600 dark:text-emerald-400">Lower training cost</strong> and energy consumption</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>

            {/* Right: Comparison Chart */}
            <div className="flex-1 flex flex-col bg-surface rounded-2xl border border-border shadow-sm p-6">
                <h3 className="font-bold text-lg">Smaller model, better performance</h3>

                <div className="flex-1 w-full min-h-0 p-4">
                    {/* Native SVG Scatter Plot */}
                    <ComparisonScatterChart data={comparisonData} />
                </div>

                <div className="mt-4 flex gap-4 justify-center text-xs">
                    {comparisonData.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color, opacity: item.opacity }}
                            />
                            <span className={i === 1 ? "font-bold text-emerald-600 dark:text-emerald-400" : ""}>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});


function ComparisonScatterChart({ data }: { data: any[] }) {
    const width = 600;
    const height = 400;
    const padding = { top: 40, right: 40, bottom: 60, left: 60 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    // Domain Calculation
    const minSize = 0; const maxSize = 160;
    const minScore = 27.0; const maxScore = 28.2;

    const getX = (size: number) => padding.left + ((size - minSize) / (maxSize - minSize)) * graphWidth;
    const getY = (score: number) => {
        // Reversed: minScore at Top, maxScore at Bottom
        return padding.top + ((score - minScore) / (maxScore - minScore)) * graphHeight;
    };

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible font-sans select-none">
            {/* Axes */}
            <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="currentColor" className="text-foreground" />
            <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="currentColor" className="text-foreground" />

            {/* X Labels (Size) */}
            {[0, 50, 100, 150].map(val => (
                <g key={val}>
                    <line x1={getX(val)} y1={height - padding.bottom} x2={getX(val)} y2={height - padding.bottom + 6} stroke="currentColor" />
                    <text x={getX(val)} y={height - padding.bottom + 20} textAnchor="middle" className="text-xs fill-muted-foreground">{val}</text>
                </g>
            ))}
            <text x={width / 2} y={height - 20} textAnchor="middle" className="text-xs font-bold fill-foreground">Model Size (Params M)</text>

            {/* Y Labels (RMSE) */}
            {[27.0, 27.2, 27.4, 27.6, 27.8, 28.0].map(val => (
                <g key={val}>
                    <line x1={padding.left} y1={getY(val)} x2={padding.left - 6} y2={getY(val)} stroke="currentColor" />
                    <text x={padding.left - 10} y={getY(val) + 4} textAnchor="end" className="text-xs fill-muted-foreground">{val.toFixed(1)}</text>
                    {/* Grid line */}
                    <line x1={padding.left} y1={getY(val)} x2={width - padding.right} y2={getY(val)} stroke="currentColor" strokeOpacity={0.1} strokeDasharray="4 4" />
                </g>
            ))}
            <text x={20} y={height / 2} transform={`rotate(-90, 20, ${height / 2})`} textAnchor="middle" className="text-xs font-bold fill-foreground">RMSE (Lower is Better)</text>

            {/* Arrow pointing to "sweet spot" */}
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#10B981" />
                </marker>
            </defs>
            <line
                x1={getX(33) - 60}
                y1={getY(27.1) - 40}
                x2={getX(33) - 10}
                y2={getY(27.1) - 10}
                stroke="#10B981"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
            />
            <text x={getX(33) - 65} y={getY(27.1) - 45} textAnchor="middle" className="text-xs font-bold fill-emerald-600 dark:fill-emerald-400">
                Sweet Spot!
            </text>

            {/* Points */}
            {data.map((d, i) => (
                <motion.g
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.3 }}
                >
                    <circle cx={getX(d.size)} cy={getY(d.score)} r={d.size / 4} fill={d.color} opacity={d.opacity * 0.6} />
                    <circle cx={getX(d.size)} cy={getY(d.score)} r={6} fill={d.color} opacity={d.opacity} />
                    <circle cx={getX(d.size)} cy={getY(d.score)} r={3} fill="white" />
                    {/* Label */}
                    <text
                        x={getX(d.size)}
                        y={getY(d.score) + (i === 1 ? 25 : -15)}
                        textAnchor="middle"
                        className={`text-[11px] font-bold ${i === 1 ? 'fill-emerald-600 dark:fill-emerald-400' : 'fill-muted-foreground'}`}
                    >
                        {d.score}
                    </text>
                </motion.g>
            ))}
        </svg>
    )
}

OurModelPerformanceSlide.displayName = "OurModelPerformanceSlide";
export default OurModelPerformanceSlide;
