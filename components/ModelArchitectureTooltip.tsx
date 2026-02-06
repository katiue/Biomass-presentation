import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

interface ModelArchitectureTooltipProps {
    stage: 1 | 2;
}

export default function ModelArchitectureTooltip({ stage }: ModelArchitectureTooltipProps) {
    if (stage === 1) {
        return (
            <div className="flex flex-col gap-2 p-4 min-w-[600px]">
                <div className="text-sm font-bold text-foreground border-b border-border pb-2 mb-1">
                    Stage 1: Pixel-Wise 1D CNN
                </div>

                {/* Architecture Diagram - Horizontal Flow */}
                <div className="flex items-center gap-2 text-[10px] font-mono py-2">

                    {/* Input */}
                    <div className="bg-slate-100 border-2 border-slate-400 px-3 py-2 rounded-lg text-center">
                        <div className="font-bold text-slate-700">Input</div>
                        <div className="text-[9px] text-slate-600">12M×15Ch</div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400" />

                    {/* Conv1D Block 1 */}
                    <div className="bg-blue-100 border-2 border-blue-400 px-3 py-2 rounded-lg text-center">
                        <div className="font-bold text-blue-700">Conv1D</div>
                        <div className="text-[9px] text-blue-600">(64)</div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400" />

                    <div className="bg-red-100 border-2 border-red-300 px-2 py-2 rounded text-center">
                        <div className="font-bold text-red-700 text-[9px]">MaxPool</div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400" />

                    {/* Conv1D Block 2 */}
                    <div className="bg-blue-100 border-2 border-blue-400 px-3 py-2 rounded-lg text-center">
                        <div className="font-bold text-blue-700">Conv1D</div>
                        <div className="text-[9px] text-blue-600">(128)</div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400" />

                    <div className="bg-red-100 border-2 border-red-300 px-2 py-2 rounded text-center">
                        <div className="font-bold text-red-700 text-[9px]">GlobalPool</div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400" />

                    {/* FC Layers */}
                    <div className="bg-amber-100 border-2 border-amber-400 px-3 py-2 rounded-lg text-center">
                        <div className="font-bold text-amber-800">FC</div>
                        <div className="text-[9px] text-amber-700">512→128→1</div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-400" />

                    {/* Output */}
                    <div className="bg-green-100 border-2 border-green-400 px-3 py-2 rounded-lg text-center">
                        <div className="font-bold text-green-800">Output</div>
                        <div className="text-[9px] text-green-700">Biomass</div>
                    </div>
                </div>
            </div>
        );
    }

    // Stage 2: 3D U-Net - Using generated image
    return (
        <div className="flex flex-col gap-2 p-3">
            <div className="text-sm font-bold text-foreground border-b border-border pb-2 mb-1">
                Stage 2: Spatiotemporal 3D U-Net
            </div>
            <img
                src="/assets/stage2_architecture.png"
                alt="3D U-Net Architecture"
                className="w-[320px] h-auto"
            />
            <div className="text-[9px] text-center text-muted italic">
                Skip connections preserve spatial details
            </div>
        </div>
    );
}
