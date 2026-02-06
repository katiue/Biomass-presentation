import React, { forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";

import { Network, GitMerge, Award } from "lucide-react";

const ModelDesignSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const data = [
        { name: "EffNetV2-L (Winner - Ours)", size: 150, score: 27.63, color: '#2E86AB', shape: 'circle' },
        { name: "Swin UNETR", size: 40, score: 27.68, color: '#A23B72', shape: 'square' },
        { name: "Ensemble (15 EffNet-B4)", size: 50, score: 28.04, color: '#F18F01', shape: 'triangle' },
    ];

    return (
        <div className="flex h-full p-8 gap-8 overflow-hidden">
            {/* Left: Design Concept */}
            <div className="w-[450px] flex flex-col justify-center gap-8 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-bold mb-2 text-foreground tracking-tight">Diminishing Returns</h2>
                    <h3 className="text-xl text-primary font-mono font-medium">Size isn't everything</h3>
                </motion.div>

                <div className="flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-2"
                    >
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            While scaling up parameters improves performance initially, we hit a <span className="text-foreground font-bold">plateau</span>.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Adding millions of parameters yields only marginal gains in RMSE as shown in the chart.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-orange-500/20 rounded-lg text-orange-600 dark:text-orange-400">
                                <Award className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-xl text-foreground">The Cost of Scale</h4>
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                            Heavier models mean slower inference and exponentially higher training costs. We need a smarter approach, not just a bigger one.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right: Scatter Plot */}
            <div className="flex-1 flex flex-col bg-surface rounded-2xl border border-border shadow-sm p-6">
                <div className="mb-4">
                    <h3 className="font-bold text-lg">Model Size vs. RMSE Performance</h3>
                    <p className="text-xs text-muted-foreground">Lower RMSE (Y-Axis) is better.</p>
                </div>

                <div className="flex-1 w-full min-h-0 p-4">
                    {/* Native SVG Scatter Plot */}
                    <CustomScatterChart data={data} />
                </div>

                <div className="mt-4 flex gap-4 justify-center text-xs">
                    {data.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});


function CustomScatterChart({ data }: { data: any[] }) {
    const width = 600;
    const height = 400;
    const padding = { top: 40, right: 40, bottom: 60, left: 60 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    // Domain Calculation
    // Size: 0 to 160
    const minSize = 0; const maxSize = 160;
    // RMSE: 27.5 to 28.2
    const minScore = 27.5; const maxScore = 28.2;

    const getX = (size: number) => padding.left + ((size - minSize) / (maxSize - minSize)) * graphWidth;
    // Y is reversed? No, keep it standard relative to plot, but label it "Lower is better"
    // Usually scatter plots have (0,0) at bottom-left. 
    // If I want 27.5 at the top (better) and 28.2 at bottom, I invert the Y calculation.
    // Wait, usually the user wants to see "Better" at the top or right.
    // Let's standard plot: Y up increases. RMSE increases up. So Better is DOWN.
    // The previous code had `reversed={true}`, so 27.5 was at Top, 28.2 at Bottom.
    // So:
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

            {/* Y Labels (RMSE) - 27.5(Top) to 28.2(Bottom) */}
            {[27.6, 27.8, 28.0, 28.2].map(val => (
                <g key={val}>
                    <line x1={padding.left} y1={getY(val)} x2={padding.left - 6} y2={getY(val)} stroke="currentColor" />
                    <text x={padding.left - 10} y={getY(val) + 4} textAnchor="end" className="text-xs fill-muted-foreground">{val}</text>
                    {/* Grid line */}
                    <line x1={padding.left} y1={getY(val)} x2={width - padding.right} y2={getY(val)} stroke="currentColor" strokeOpacity={0.1} strokeDasharray="4 4" />
                </g>
            ))}
            <text x={20} y={height / 2} transform={`rotate(-90, 20, ${height / 2})`} textAnchor="middle" className="text-xs font-bold fill-foreground">RMSE (Lower is Better)</text>

            {/* Points */}
            {data.map((d, i) => (
                <motion.g
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.2 }}
                >
                    <circle cx={getX(d.size)} cy={getY(d.score)} r={d.size / 5} fill={d.color} opacity={0.8} />
                    <circle cx={getX(d.size)} cy={getY(d.score)} r={3} fill="white" />
                    {/* Label */}
                    <text x={getX(d.size)} y={getY(d.score) - (d.size / 5) - 5} textAnchor="middle" className="text-[10px] font-bold fill-foreground">
                        {d.score}
                    </text>
                </motion.g>
            ))}
        </svg>
    )
}

ModelDesignSlide.displayName = "ModelDesignSlide";
export default ModelDesignSlide;
