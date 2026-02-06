import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";
import { CheckCircle, Activity } from "lucide-react";
import Chart from "../Chart";

interface TrainingData {
    [key: string]: { epoch: number; val_rmse: number; train_loss: number }[];
}

const ConfigurationChoiceSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const [trainingData, setTrainingData] = useState<TrainingData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/assets/training_simulation.json')
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

    const configs = [
        { key: "patch_8x8", label: "8x8 Patch", best: 33.92, color: "text-gray-400" },
        { key: "patch_16x16", label: "16x16 Patch", best: 32.55, color: "text-gray-400" },
        { key: "patch_32x32", label: "32x32 Patch", best: 31.65, color: "text-gray-400" },
        { key: "patch_64x64", label: "64x64 Patch", best: 30.81, color: "text-primary", highlight: true },
        { key: "patch_128x128", label: "128x128 Patch", best: 31.21, color: "text-gray-400" },
    ];

    return (
        <div className="flex flex-col h-full p-8 overflow-hidden">
            <div className="mb-6 text-center shrink-0">
                <h2 className="text-3xl font-bold mb-2 text-foreground">Patch Configuration Analysis</h2>
                <div className="flex items-center justify-center gap-2 text-muted">
                    <Activity className="w-4 h-4" />
                    <span>Training Convergence Comparison</span>
                </div>
            </div>

            <div className="grid grid-cols-3 grid-rows-2 gap-6 w-full h-full max-h-[800px] pb-4">
                {configs.map((config) => {
                    const data = trainingData?.[config.key] || [];
                    return (
                        <div key={config.key} className={`relative bg-surface rounded-xl border ${config.highlight ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border/40'} p-4 flex flex-col shadow-sm overflow-hidden`}>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className={`font-mono font-bold text-sm ${config.color.replace('text-', 'text-')}`}>{config.label}</h3>
                                <span className="text-xs font-bold bg-secondary/30 px-2 py-1 rounded text-muted-foreground">RMSE: {config.best}</span>
                            </div>

                            <div className="flex-1 min-h-0 relative">
                                {loading ? (
                                    <div className="absolute inset-0 flex items-center justify-center text-xs text-muted">Loading...</div>
                                ) : (
                                    <div className="absolute inset-0 w-full h-full">
                                        <Chart
                                            data={data}
                                            xKey="epoch"
                                            yKey="val_rmse"
                                            type="line"
                                            yDomain={[30, 60]} // Common scale for valid comparison
                                            color={config.highlight ? "var(--color-primary)" : "currentColor"}
                                            isActive={props.isActive}
                                            width={300} // Hints for aspect ratio
                                            height={150}
                                        />
                                    </div>
                                )}
                            </div>
                            {config.highlight && (
                                <div className="absolute top-2 right-2">
                                    <CheckCircle className="w-4 h-4 text-primary" />
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Last Cell - Summary/Legend */}
                <div className="bg-primary/5 rounded-xl border border-primary/20 p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-primary mb-4">Why 64x64?</h3>
                    <ul className="space-y-3 text-sm text-foreground/80">
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            <span><strong>Optimal Balance:</strong> Provides sufficient spatial context without over-smoothing features.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            <span><strong>Convergence:</strong> Achieves lowest validation RMSE (30.81) stably.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            <span><strong>Sample Efficiency:</strong> Maintains adequate training diversity compared to 128x128.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
});

ConfigurationChoiceSlide.displayName = "ConfigurationChoiceSlide";
export default ConfigurationChoiceSlide;
