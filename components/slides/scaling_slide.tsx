import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";
import { TrendingUp, Maximize, AlertTriangle, Layers } from "lucide-react";

interface TrainingData {
    [key: string]: { epoch: number; val_rmse: number; train_loss: number }[];
}

const ScalingSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const [trainingData, setTrainingData] = useState<TrainingData | null>(null);
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

    // Combine data for comparison chart, ensuring all series are aligned by epoch
    const comparisonData = React.useMemo(() => {
        if (!trainingData) return [];
        const d64 = trainingData['patch_64x64'] || [];
        const d128 = trainingData['patch_128x128'] || [];
        const d256 = trainingData['patch_256x256'] || [];

        const length = Math.max(d64.length, d128.length, d256.length);
        const combined = [];
        for (let i = 0; i < length; i++) {
            combined.push({
                epoch: i + 1,
                val_rmse_64: d64[i]?.val_rmse || null,
                val_rmse_128: d128[i]?.val_rmse || null,
                val_rmse_256: d256[i]?.val_rmse || null
            });
        }
        return combined;
    }, [trainingData]);

    return (
        <div className="flex h-full p-8 gap-8 overflow-hidden">
            {/* Left: Explanation */}
            <div className="w-[450px] flex flex-col justify-center space-y-6 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-bold mb-2 text-foreground tracking-tight">Scaling Up</h2>
                    <h3 className="text-xl text-primary font-mono font-medium">Bigger Context = Better?</h3>
                </motion.div>

                <div className="flex flex-col gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-surface border border-border/50 rounded-xl p-4 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                <Maximize className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-foreground">Model Capacity (10M Params)</h4>
                        </div>
                        <p className="text-sm text-muted-foreground pl-12">
                            With more parameters, the model can digest larger spatial contexts without saturating.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-surface border border-border/50 rounded-xl p-4 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                                <Layers className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-foreground">256x256 Patch Size</h4>
                        </div>
                        <p className="text-sm text-muted-foreground pl-12 scale-105 origin-left font-medium text-purple-600 dark:text-purple-400">
                            Increasing patch size to 256x256 yields the best RMSE. The model effectively utilizes the broader context.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-foreground">Observation</h4>
                        </div>
                        <p className="text-sm text-muted-foreground pl-12 italic">
                            Scaling consistently improves accuracy, but the gains are shrinking. We are approaching the limit of what pure contextual scaling can achieve.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right: Chart */}
            <div className="flex-1 flex flex-col bg-surface rounded-2xl border border-border shadow-sm p-6 relative">
                <div className="mb-4 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Validation RMSE Comparison</h3>
                    <div className="flex gap-4 text-xs font-mono">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <span>64x64</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span>128x128</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500" />
                            <span>256x256</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full min-h-0 relative">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center text-muted">Loading Simulation Data...</div>
                    ) : (
                        <div className="absolute inset-0 w-full h-full p-4">
                            <CustomMultiLineChart data={comparisonData} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

// Custom SVG Chart for Multi-Line Comparison
function CustomMultiLineChart({ data }: { data: any[] }) {
    // 1. Calculate Scales
    const width = 800;
    const height = 400;
    const padding = { top: 20, right: 40, bottom: 40, left: 50 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    if (data.length === 0) return null;

    const epochs = data.map(d => d.epoch);
    const maxEpoch = Math.max(...epochs);
    const minEpoch = Math.min(...epochs);

    // Find Y domain (ignore nulls)
    const allY = data.flatMap(d => [d.val_rmse_64, d.val_rmse_128, d.val_rmse_256]).filter(v => v !== null) as number[];
    const minY = Math.min(...allY) * 0.98;
    const maxY = Math.max(...allY) * 1.02;

    const getX = (epoch: number) => padding.left + ((epoch - minEpoch) / (maxEpoch - minEpoch)) * graphWidth;
    const getY = (val: number) => padding.top + (graphHeight - ((val - minY) / (maxY - minY)) * graphHeight);

    // 2. Create Paths
    const createPath = (key: string) => {
        return data.reduce((path, d, i) => {
            const val = d[key];
            if (val === null) return path;
            const x = getX(d.epoch);
            const y = getY(val);
            return path + (i === 0 ? `M ${x},${y}` : ` L ${x},${y}`);
        }, "");
    };

    const path64 = createPath('val_rmse_64');
    const path128 = createPath('val_rmse_128');
    const path256 = createPath('val_rmse_256');

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible font-sans select-none">
            {/* Grid & Axes */}
            <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="currentColor" className="text-foreground" />
            <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="currentColor" className="text-foreground" />

            {/* Y Ticks */}
            {[0, 0.25, 0.5, 0.75, 1].map(t => {
                const val = minY + t * (maxY - minY);
                const y = getY(val);
                return (
                    <g key={t}>
                        <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="currentColor" strokeOpacity={0.1} />
                        <text x={padding.left - 10} y={y + 4} textAnchor="end" className="text-xs fill-muted-foreground">{val.toFixed(1)}</text>
                    </g>
                );
            })}

            {/* X Ticks (Every 20 epochs to accommodate 150 epoch training) */}
            {epochs.filter(e => e % 20 === 0).map(e => (
                <g key={e}>
                    <line x1={getX(e)} y1={height - padding.bottom} x2={getX(e)} y2={height - padding.bottom + 6} stroke="currentColor" className="text-muted-foreground" />
                    <text x={getX(e)} y={height - padding.bottom + 20} textAnchor="middle" className="text-xs fill-muted-foreground">{e}</text>
                </g>
            ))}

            {/* Lines */}
            <motion.path
                d={path64}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1 }}
            />
            <motion.path
                d={path128}
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.path
                d={path256}
                fill="none"
                stroke="#a855f7"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
            />

            {/* Labels at the end of lines */}
            <text x={getX(maxEpoch) + 5} y={getY(data[data.length - 1]?.val_rmse_64 || 0)} fill="#3b82f6" dominantBaseline="middle" className="text-[10px] font-bold">64</text>
            <text x={getX(maxEpoch) + 5} y={getY(data[data.length - 1]?.val_rmse_128 || 0)} fill="#22c55e" dominantBaseline="middle" className="text-[10px] font-bold">128</text>
            <text x={getX(maxEpoch) + 5} y={getY(data[data.length - 1]?.val_rmse_256 || 0)} fill="#a855f7" dominantBaseline="middle" className="text-[10px] font-bold">256</text>
        </svg>
    );
}

ScalingSlide.displayName = "ScalingSlide";
export default ScalingSlide;
