import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface ChartProps {
    data: any[];
    xKey: string;
    yKey: string;
    type: "bar" | "line";
    width?: number; // ViewBox width, not pixel
    height?: number; // ViewBox height
    color?: string;
    yDomain?: [number, number];
    xAxisLabel?: string;
    yAxisLabel?: string;
    highlightCondition?: (item: any) => boolean;
    isActive?: boolean;
}

export default function Chart({
    data,
    xKey,
    yKey,
    type,
    width = 800,
    height = 400,
    color = "currentColor",
    yDomain,
    xAxisLabel,
    yAxisLabel,
    highlightCondition,
    isActive = true,
}: ChartProps) {
    const padding = { top: 20, right: 30, bottom: 50, left: 60 };
    const graphWidth = width - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    // 1. Calculate Domains
    const yValues = data.map((d) => d[yKey]);
    const minDataY = Math.min(...yValues);
    const maxDataY = Math.max(...yValues);

    // Add some padding to Y domain if auto-calculated
    const computedYMin = yDomain ? yDomain[0] : Math.floor(minDataY * 0.95);
    const computedYMax = yDomain ? yDomain[1] : Math.ceil(maxDataY * 1.05);

    const yScale = (val: number) => {
        return graphHeight - ((val - computedYMin) / (computedYMax - computedYMin)) * graphHeight;
    };

    // 2. Generate Ticks
    // Y Ticks (5 ticks)
    const yTicks = useMemo(() => {
        const count = 5;
        const step = (computedYMax - computedYMin) / (count - 1);
        return Array.from({ length: count }, (_, i) => {
            const val = computedYMin + i * step;
            return { val, y: yScale(val) };
        });
    }, [computedYMin, computedYMax]);

    // X Ticks
    const xTicks = useMemo(() => {
        if (type === "line") {
            // Find clean intervals for line chart (numeric X)
            const xValues = data.map(d => d[xKey]);
            const minX = Math.min(...xValues);
            const maxX = Math.max(...xValues);
            const count = 6;
            const step = (maxX - minX) / (count - 1);
            return Array.from({ length: count }, (_, i) => {
                const val = Math.round(minX + i * step);
                const x = ((val - minX) / (maxX - minX)) * graphWidth;
                return { val, x, label: val.toString() };
            });
        } else {
            // Bar chart (categorical X)
            const step = graphWidth / data.length;
            return data.map((d, i) => ({
                val: d[xKey], // Raw value
                x: i * step + step / 2, // Centered
                label: d[xKey].toString()
            }));
        }
    }, [data, xKey, type, graphWidth]);


    // 3. Render Paths/Bars
    const renderContent = () => {
        if (type === "line") {
            // Assume X is numeric and sorted for line chart
            const xValues = data.map(d => d[xKey]);
            const minX = Math.min(...xValues);
            const maxX = Math.max(...xValues);

            const pointStr = data.map((d) => {
                const x = ((d[xKey] - minX) / (maxX - minX)) * graphWidth;
                const y = yScale(d[yKey]);
                return `${x + padding.left},${y + padding.top}`;
            }).join(" ");

            // Smooth curve would be better, but let's stick to polyline for accuracy or basic smoothing
            // Let's do a simple SVG path
            return (
                <motion.path
                    d={`M ${pointStr.replace(/ /g, " L ")}`}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            );
        } else {
            // Bar Chart
            const barWidth = (graphWidth / data.length) * 0.6; // 60% width
            return data.map((d, i) => {
                const val = d[yKey];
                const barHeight = graphHeight - yScale(val);
                const x = (i * (graphWidth / data.length)) + (graphWidth / data.length - barWidth) / 2;
                const isHighlighted = highlightCondition ? highlightCondition(d) : false;
                const barColor = isHighlighted ? color : "currentColor";
                const opacity = isHighlighted ? 1 : 0.3;

                return (
                    <g key={i}>
                        <motion.rect
                            x={x + padding.left}
                            y={yScale(val) + padding.top}
                            width={barWidth}
                            height={barHeight}
                            fill={barColor}
                            opacity={opacity}
                            initial={{ scaleY: 0, originY: 1 }}
                            animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        />
                        {/* Value Label on top of bar */}
                        <motion.text
                            x={x + padding.left + barWidth / 2}
                            y={yScale(val) + padding.top - 10}
                            textAnchor="middle"
                            fill={barColor}
                            className="text-xs font-bold"
                            initial={{ opacity: 0 }}
                            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                        >
                            {val.toFixed(2)}
                        </motion.text>
                    </g>
                );
            });
        }
    };


    return (
        <div className="w-full h-full flex items-center justify-center">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none font-sans">

                {/* Grid Lines (Horizontal) */}
                {yTicks.map(({ val, y }, i) => (
                    <g key={`grid-${i}`}>
                        <line
                            x1={padding.left}
                            y1={y + padding.top}
                            x2={width - padding.right}
                            y2={y + padding.top}
                            stroke="currentColor"
                            className="text-border"
                            strokeOpacity="0.2"
                        />
                        <text
                            x={padding.left - 10}
                            y={y + padding.top + 4}
                            textAnchor="end"
                            className="text-xs fill-muted-foreground"
                        >
                            {val.toFixed(1)}
                        </text>
                    </g>
                ))}

                {/* X Axis & Ticks */}
                <line
                    x1={padding.left}
                    y1={height - padding.bottom}
                    x2={width - padding.right}
                    y2={height - padding.bottom}
                    stroke="currentColor"
                    className="text-foreground"
                />
                {xTicks.map(({ val, x, label }, i) => (
                    <g key={`xtick-${i}`}>
                        <line
                            x1={x + padding.left}
                            y1={height - padding.bottom}
                            x2={x + padding.left}
                            y2={height - padding.bottom + 6}
                            stroke="currentColor"
                            className="text-muted-foreground"
                        />
                        <text
                            x={x + padding.left}
                            y={height - padding.bottom + 20}
                            textAnchor="middle"
                            className="text-xs fill-muted-foreground font-medium"
                        >
                            {label}
                        </text>
                    </g>
                ))}

                {/* Labels */}
                {yAxisLabel && (
                    <text
                        x={15}
                        y={height / 2}
                        transform={`rotate(-90, 15, ${height / 2})`}
                        textAnchor="middle"
                        className="text-sm fill-muted-foreground font-bold tracking-widest uppercase"
                    >
                        {yAxisLabel}
                    </text>
                )}
                {xAxisLabel && (
                    <text
                        x={width / 2}
                        y={height - 10}
                        textAnchor="middle"
                        className="text-sm fill-muted-foreground font-bold tracking-widest uppercase"
                    >
                        {xAxisLabel}
                    </text>
                )}

                {/* Data Content */}
                {renderContent()}

            </svg>
        </div>
    );
}
