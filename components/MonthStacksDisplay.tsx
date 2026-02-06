"use client";

import { motion } from "framer-motion";

interface MonthStacksDisplayProps {
    isStacked: boolean;
    isScanning: boolean;
    animationDuration?: number;
    patchSize?: "pixel" | "patch";
    onPixelClick?: (monthIndex: number) => void;
    highlightMonth?: number;
    showFirstPixelHighlight?: boolean;
}

export default function MonthStacksDisplay({
    isStacked,
    isScanning,
    animationDuration = 1,
    patchSize = "patch",
    onPixelClick,
    highlightMonth,
    showFirstPixelHighlight = false
}: MonthStacksDisplayProps) {
    const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const numChannels = 15;
    const scanBoxSize = patchSize === "pixel" ? "w-2 h-2" : "w-8 h-8";

    // Channel labels
    const channelLabels = [
        'VV', 'VH', 'Ratio', 'Angle', // S1: 0-3
        'B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B8A', 'B11', 'B12' // S2: 4-14
    ];

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {months.map((month, monthIdx) => (
                    <div key={monthIdx}>
                        {Array.from({ length: numChannels }).map((_, channelIdx) => {
                            const imgSize = 90; // Larger, more visible images
                            const colSpacing = 95; // Horizontal spacing (tighter)
                            const rowSpacing = 70;  // Vertical spacing

                            // Calculate grid dimensions:
                            // Width: 15 columns * 95px = 1425px (14 gaps of 95px)
                            // Height: 12 rows * 70px = 770px (11 gaps of 70px)

                            // Center the grid by offsetting from origin
                            const gridWidth = 14 * colSpacing;
                            const gridHeight = 11 * rowSpacing;
                            const startX = -(gridWidth / 2);
                            const startY = -(gridHeight / 2);

                            // Grid Position (Transposed: col=channel, row=month)
                            const gridX = startX + (channelIdx * colSpacing);
                            const gridY = startY + (monthIdx * rowSpacing);

                            // STACKED POSITION (4x3 Grid)
                            // 12 months arranged in 3 rows of 4 columns
                            const stackColSpacing = 180; // Generous horizontal spacing
                            const stackRowSpacing = 180; // Generous vertical spacing

                            const stackCols = 4;
                            const stackRows = 3;

                            const col = monthIdx % stackCols; // 0, 1, 2, 3
                            const row = Math.floor(monthIdx / stackCols); // 0, 1, 2

                            // Center the 4x3 grid
                            const gridStackWidth = (stackCols - 1) * stackColSpacing;
                            const gridStackHeight = (stackRows - 1) * stackRowSpacing;

                            const stackStartX = -(gridStackWidth / 2);
                            const stackStartY = -(gridStackHeight / 2);

                            const stackX = stackStartX + (col * stackColSpacing);
                            const stackY = stackStartY + (row * stackRowSpacing);

                            const stackOffsetX = channelIdx * 4;
                            const stackOffsetY = channelIdx * -5; // More pronounced depth

                            const finalStackX = stackX + stackOffsetX;
                            const finalStackY = stackY + stackOffsetY;

                            const isTopLayer = channelIdx === numChannels - 1;
                            const isRGBLayer = channelIdx === numChannels - 1;

                            return (
                                <motion.div
                                    key={`${monthIdx}-${channelIdx}`}
                                    className="absolute rounded overflow-hidden shadow-md border border-white/20 cursor-pointer origin-center"
                                    style={{
                                        width: `${imgSize}px`,
                                        height: `${imgSize}px`,
                                        zIndex: isStacked ? (channelIdx + 1) : (channelIdx * 100 + monthIdx), // Z-index priority changes
                                    }}
                                    animate={{
                                        x: isStacked ? finalStackX : gridX,
                                        y: isStacked ? finalStackY : gridY,
                                        opacity: isStacked ? (isTopLayer ? 1 : 0.7 - channelIdx * 0.04) : 1,
                                        scale: isStacked ? 1.1 : 1,
                                        rotateX: isStacked ? 10 : 0,
                                        rotateY: isStacked ? -10 : 0,
                                    }}
                                    transition={{
                                        duration: animationDuration,
                                        delay: isStacked ? (monthIdx * 0.05 + channelIdx * 0.01) : (channelIdx * 0.02), // Ripple by channel in grid
                                        type: "spring",
                                        stiffness: 80,
                                        damping: 15
                                    }}
                                    onClick={() => onPixelClick?.(monthIdx)}
                                >
                                    {/* Image Content */}
                                    {isRGBLayer ? (
                                        <img
                                            src={`/assets/s2_${monthIdx}.png`}
                                            alt={`${month} RGB`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={`/assets/m${monthIdx}_ch${channelIdx}.png`}
                                            alt={`${month} Ch${channelIdx}`}
                                            className="w-full h-full object-cover"
                                            style={{
                                                filter: channelIdx < 4 ? 'contrast(1.2)' : 'contrast(1.1)',
                                            }}
                                        />
                                    )}

                                    {/* Label overlay - show in grid view */}
                                    {!isStacked && (
                                        <div className="absolute top-0 left-0 text-[10px] bg-black/60 text-white px-1 font-mono opacity-0 hover:opacity-100 transition-opacity w-full text-center">
                                            {month}
                                        </div>
                                    )}

                                    {/* Channel Column Label (Only on top row) */}
                                    {!isStacked && monthIdx === 0 && (
                                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-400 font-mono whitespace-nowrap">
                                            {channelLabels[channelIdx]}
                                        </div>
                                    )}

                                    {/* Month Stack Label (Only on top layer when stacked) */}
                                    {isStacked && isTopLayer && (
                                        <div className="absolute bottom-0 left-0 right-0 text-[10px] bg-black/70 text-white text-center font-mono">
                                            {month}
                                        </div>
                                    )}

                                    {/* Scanning animation */}
                                    {isScanning && isStacked && isTopLayer && (
                                        <motion.div
                                            className={`absolute border-2 border-red-500 bg-red-500/30 z-50 shadow-[0_0_10px_rgba(239,68,68,0.6)] ${scanBoxSize}`}
                                            animate={{
                                                top: ["0%", "0%", "0%", "30%", "30%", "30%", "60%", "60%", "60%"],
                                                left: ["0%", "30%", "60%", "0%", "30%", "60%", "0%", "30%", "60%"],
                                                opacity: [1, 1, 1, 1, 1, 1, 1, 1, 0]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                repeatDelay: 0.5
                                            }}
                                        />
                                    )}

                                    {/* Static First Pixel Highlight */}
                                    {showFirstPixelHighlight && isStacked && isTopLayer && !isScanning && (
                                        <motion.div
                                            className={`absolute top-0 left-0 border-2 border-green-400 bg-green-400/30 z-50 shadow-[0_0_15px_rgba(74,222,128,0.6)] ${scanBoxSize}`}
                                            initial={{ scale: 1.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
