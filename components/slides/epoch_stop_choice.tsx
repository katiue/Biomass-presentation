import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";
import { TrendingDown, Box } from "lucide-react";
import Chart from "../Chart";

interface TrainingLog {
    epoch: number;
    val_rmse: number;
    train_loss: number;
}

const EpochStopChoiceSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    const [data, setData] = useState<TrainingLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/assets/training_simulation.json')
            .then(res => res.json())
            .then(json => {
                if (json.patch_64x64) {
                    setData(json.patch_64x64);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load training data", err);
                setLoading(false);
            });
    }, []);

    const modelSizeData = [
        { name: "Ours", value: 0.5, color: "text-primary", highlight: true },
        { name: "Swin-UNETR", value: 40, color: "text-gray-400" },
        { name: "Ensemble", value: 50, color: "text-gray-400" },
        { name: "EffNetV2-L", value: 150, color: "text-gray-400" },
    ];

    return (
        <div className="flex flex-col h-full p-8">
            <div className="mb-6 text-center shrink-0">
                <h2 className="text-3xl font-bold mb-2 text-foreground">Architecture Efficiency</h2>
                <div className="flex items-center justify-center gap-2 text-muted">
                    <span>Convergence Strategy & Model Complexity</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 flex-1 min-h-0">

                {/* Left: Training Curve */}
                <div className="flex flex-col gap-4">
                    <div className="flex-1 bg-surface rounded-xl border border-border/50 p-6 shadow-sm relative flex flex-col">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <TrendingDown className="w-5 h-5 text-primary" />
                            Training Convergence
                        </h3>
                        <div className="flex-1 w-full min-h-0 relative">
                            {loading ? (
                                <div className="absolute inset-0 flex items-center justify-center text-muted">Loading...</div>
                            ) : (
                                <div className="absolute inset-0">
                                    <Chart
                                        data={data}
                                        xKey="epoch"
                                        yKey="val_rmse"
                                        type="line"
                                        xAxisLabel="Epochs"
                                        yAxisLabel="Validation RMSE"
                                        color="var(--color-primary)"
                                        isActive={props.isActive}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-secondary/10 p-4 rounded-lg text-sm text-muted-foreground">
                        <span className="font-bold text-foreground">Why 50 Epochs?</span> Training saturates quickly due to the lightweight architecture. Extending beyond 50 epochs yields diminishing returns and risks overfitting.
                    </div>
                </div>

                {/* Right: Model Parameter Comparison */}
                <div className="flex flex-col gap-4">
                    <div className="flex-1 bg-surface rounded-xl border border-border/50 p-6 shadow-sm relative flex flex-col">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Box className="w-5 h-5 text-primary" />
                            Parameter Efficiency (Millions)
                        </h3>
                        <div className="flex-1 w-full min-h-0 relative">
                            <div className="absolute inset-0">
                                <Chart
                                    data={modelSizeData}
                                    xKey="name"
                                    yKey="value"
                                    type="bar"
                                    xAxisLabel="Model Architecture"
                                    yAxisLabel="Parameters (M)"
                                    color="var(--color-primary)"
                                    highlightCondition={(d) => d.highlight}
                                    isActive={props.isActive}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-secondary/10 p-4 rounded-lg text-sm text-muted-foreground">
                        <span className="font-bold text-foreground">Why Small Patches?</span> Our model (~0.5M params) is <span className="text-primary font-bold">~300x smaller</span> than SOTA vision backbones. Processing small 64x64 patches allows us to maintain high throughput and effectively capture local texture gradients without needing massive capacity.
                    </div>
                </div>

            </div>
        </div>
    );
});

EpochStopChoiceSlide.displayName = "EpochStopChoiceSlide";
export default EpochStopChoiceSlide;
