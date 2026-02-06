import React, { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SlideHandle, SlideProps } from "../../types";
import { PlayCircle } from "lucide-react";

const AIPipelineVideoSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
        next: () => false,
        prev: () => false
    }));

    // Auto-play when active
    useEffect(() => {
        if (props.isActive && videoRef.current) {
            videoRef.current.currentTime = 0;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Auto-play prevented:", error);
                });
            }
        } else if (!props.isActive && videoRef.current) {
            videoRef.current.pause();
        }
    }, [props.isActive]);

    return (
        <div className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden">

            {/* Video Container */}
            <div className="w-full h-full max-w-[1200px] max-h-[90vh] relative">
                <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    controls
                    loop
                    muted={false} // Maybe they want sound? defaulted to false usually for slides but let's allow sound if user unmutes
                >
                    <source src="/model/AI_pipeline_demonstration.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Overlay Title (only visible when paused or initial) */}
            {!props.isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
                    <div className="text-center text-white">
                        <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-80" />
                        <h2 className="text-2xl font-bold">Pipeline Demonstration</h2>
                    </div>
                </div>
            )}
        </div>
    );
});

AIPipelineVideoSlide.displayName = "AIPipelineVideoSlide";
export default AIPipelineVideoSlide;
