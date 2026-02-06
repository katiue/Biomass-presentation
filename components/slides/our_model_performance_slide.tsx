import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";

import { Zap, CheckCircle2, TrendingDown, Gauge } from "lucide-react";

const OurModelPerformanceSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const [trainingData, setTrainingData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load the larger model training data
        fetch('/assets/training_larger_simulation.json')
            .then(res => res.json())
            .then(data => {
                setTrainingData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load training data", err);
                setLoading(false);
            });
    }, []);

    const comparisonData = [
        { name: "EffNetV2-L (Winner - Ours)", size: 150, score: 27.63, color: '#2E86AB', shape: 'circle' },
        { name: "Our UnetVFLOW", size: 33, score: 27.1, color: '#10B981', opacity: 1.0 },
        { name: "Swin UNETR", size: 40, score: 27.68, color: '#A23B72', shape: 'square' },
        { name: "Ensemble (15 EffNet-B4)", size: 50, score: 28.04, color: '#F18F01', shape: 'triangle' },
    ];

    return (
        <div className="flex h-full p-8 gap-8 overflow-hidden">
            {/* Left: Performance Highlights */}
            <div className="w-[650px] flex flex-col justify-center gap-8 z-10">
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
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex flex-col justify-between h-20">
                            <div className="flex items-center gap-2">
                                <Gauge className="w-4 h-4 text-blue-500" />
                                <span className="text-xs font-mono text-blue-700 dark:text-blue-400 uppercase tracking-wider">Size</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-foreground">33M</span>
                                <span className="text-2xl text-muted-foreground">Parameters</span>
                            </div>
                        </div>

                        {/* RMSE */}
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex flex-col justify-between h-20">
                            <div className="flex items-center gap-2">
                                <TrendingDown className="w-4 h-4 text-emerald-500" />
                                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">RMSE</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-foreground">27.1</span>
                                <span className="text-2xl text-muted-foreground">Mg/ha</span>
                            </div>
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

                    {/* Training Progress Graph */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-surface border border-border/50 rounded-2xl p-5 shadow-sm"
                    >
                        <h4 className="font-bold text-base mb-3 text-foreground">Training Progress</h4>
                        <div className="h-[280px] w-full">
                            {loading ? (
                                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">Loading...</div>
                            ) : (
                                <TrainingCurveChart data={trainingData?.['large_model'] || []} />
                            )}
                        </div>
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
                    <circle cx={getX(d.size)} cy={getY(d.score)} r={d.size / 4} fill={d.color} opacity={(d.opacity ?? 1) * 0.6} />
                    <circle cx={getX(d.size)} cy={getY(d.score)} r={6} fill={d.color} opacity={d.opacity ?? 1} />
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

// Training Curve Chart Component
function TrainingCurveChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return null;

    const width = 400;
    const height = 180;
    const padding = { top: 20, right: 30, bottom: 40, left: 40 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    const epochs = data.map(d => d.epoch);
    const maxEpoch = Math.max(...epochs);
    const minEpoch = Math.min(...epochs);

    const valValues = data.map(d => d.val_rmse);
    const trainValues = data.map(d => d.train_loss);

    const allValues = [...valValues, ...trainValues];
    const minY = Math.min(...allValues) * 0.95;
    const maxY = Math.max(...allValues) * 1.05;

    const getX = (epoch: number) => padding.left + ((epoch - minEpoch) / (maxEpoch - minEpoch)) * graphWidth;
    const getY = (val: number) => padding.top + (graphHeight - ((val - minY) / (maxY - minY)) * graphHeight);

    // Sample every N epochs for cleaner visualization
    const sampleInterval = Math.max(1, Math.floor(data.length / 100));
    const sampledData = data.filter((_, i) => i % sampleInterval === 0 || i === data.length - 1);

    const valPathData = sampledData.reduce((path, d, i) => {
        const x = getX(d.epoch);
        const y = getY(d.val_rmse);
        return path + (i === 0 ? `M ${x},${y}` : ` L ${x},${y}`);
    }, "");

    const trainPathData = sampledData.reduce((path, d, i) => {
        const x = getX(d.epoch);
        const y = getY(d.train_loss);
        return path + (i === 0 ? `M ${x},${y}` : ` L ${x},${y}`);
    }, "");

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible font-sans select-none">
            {/* Axes */}
            <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="currentColor" className="text-foreground" strokeWidth="1" />
            <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="currentColor" className="text-foreground" strokeWidth="1" />

            {/* Y Ticks */}
            {[0, 0.5, 1].map(t => {
                const val = minY + t * (maxY - minY);
                const y = getY(val);
                return (
                    <g key={t}>
                        <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="currentColor" strokeOpacity={0.1} />
                        <text x={padding.left - 8} y={y + 3} textAnchor="end" className="text-[9px] fill-muted-foreground">{val.toFixed(1)}</text>
                    </g>
                );
            })}

            {/* X Ticks */}
            {[0, 0.5, 1].map(t => {
                const epoch = Math.round(minEpoch + t * (maxEpoch - minEpoch));
                const x = getX(epoch);
                return (
                    <g key={t}>
                        <line x1={x} y1={height - padding.bottom} x2={x} y2={height - padding.bottom + 4} stroke="currentColor" className="text-muted-foreground" />
                        <text x={x} y={height - padding.bottom + 14} textAnchor="middle" className="text-[9px] fill-muted-foreground">{epoch}</text>
                    </g>
                );
            })}

            {/* Axis Labels */}
            <text x={width / 2} y={height - 5} textAnchor="middle" className="text-[9px] font-semibold fill-foreground">Epoch</text>
            <text x={12} y={height / 2} transform={`rotate(-90, 12, ${height / 2})`} textAnchor="middle" className="text-[9px] font-semibold fill-foreground">Loss / RMSE</text>

            {/* Legend */}
            <g transform={`translate(${width - 120}, ${padding.top})`}>
                <rect x="0" y="0" width="10" height="2" fill="#10B981" />
                <text x="14" y="3" className="text-[9px] fill-muted-foreground">Validation (RMSE)</text>

                <rect x="0" y="12" width="10" height="2" fill="#3B82F6" />
                <text x="14" y="15" className="text-[9px] fill-muted-foreground">Training (Loss)</text>
            </g>

            {/* Training Path */}
            <motion.path
                d={trainPathData}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Validation Path */}
            <motion.path
                d={valPathData}
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Final point highlight - Validation */}
            <motion.circle
                cx={getX(data[data.length - 1].epoch)}
                cy={getY(data[data.length - 1].val_rmse)}
                r="3"
                fill="#10B981"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2, duration: 0.3 }}
            />
        </svg>
    );
}

OurModelPerformanceSlide.displayName = "OurModelPerformanceSlide";
export default OurModelPerformanceSlide;
