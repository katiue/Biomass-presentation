"use client";

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Map, TreePine, Search, Command } from "lucide-react";
import Slide from "../components/Slide";
import { SlideHandle, SlideProps } from "../types";

// Import Slide Components
import Slide1 from "../components/slides/slide_1";
import AgendaSlide from "../components/slides/agenda_slide";
import SectionProblemStatement from "../components/slides/section_problem_statement";
import SectionDataset from "../components/slides/section_dataset";
import SectionExperiments from "../components/slides/section_experiments";
import SectionPipeline from "../components/slides/section_pipeline";
import InputDataSlide from "../components/slides/input_data_slide";
import DatasetOverviewSlide from "../components/slides/dataset_overview_slide";
import DataCollectionInputSlide from "../components/slides/data_collection_input_slide";
import DataCollectionGroundTruthSlide from "../components/slides/data_collection_ground_truth_slide";
import Slide2 from "../components/slides/stage_1_inference";
import Slide3 from "../components/slides/stage_2_inference";
import ConfigurationChoiceSlide from "../components/slides/configuration_choice";
import EpochStopChoiceSlide from "../components/slides/epoch_stop_choice";
import AdaptiveCroppingSlide from "../components/slides/adaptive_cropping_slide";
import ScalingSlide from "../components/slides/scaling_slide";
import TemporalAnalysisSlide from "../components/slides/temporal_analysis_slide";
import ModelDesignSlide from "../components/slides/model_design_slide";
import ModelArchitectureSlide from "../components/slides/model_architecture_slide";
import PaperAcceptanceSlide from "../components/slides/paper_acceptance_slide";
import AIPipelineOverviewSlide from "../components/slides/ai_pipeline_overview_slide";
import AIPipelineVideoSlide from "../components/slides/ai_pipeline_video_slide";

// Problem Statement Slides
import CarbonCreditSlide from "../components/slides/carbon_credit_slide";
import ImportanceOfCalculationSlide from "../components/slides/importance_of_calculation_slide";
import BiomassFocusSlide from "../components/slides/biomass_focus_slide";
import ExistingMethodsPhysicalSlide from "../components/slides/existing_methods_physical_slide";

import CurrentLimitationsSolutionsSlide from "../components/slides/current_limitations_solutions_slide";

// --- Simple Slides (Extracted) ---

const IntroSlide = forwardRef<SlideHandle, SlideProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    next: () => false,
    prev: () => false
  }));

  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center rounded-full glass-panel border border-primary/30 mb-6 p-2 px-4 bg-primary/10">
        <TreePine className="w-6 h-6 text-primary mr-2" />
        <span className="text-primary-foreground font-mono tracking-widest uppercase text-sm">Group 1</span>
      </div>
      <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 text-foreground">
        EcoCredit <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500">Carbon Credit Trading Platform</span>
      </h1>
      <p className="text-xl md:text-2xl text-muted mx-auto leading-relaxed max-w-3xl">
        A High-Precision Deep Learning approach to estimating biomass using multi-modal satellite imagery.
      </p>
      <div className="mt-12 text-sm font-mono text-muted animate-pulse">
        Press Arrow Keys or Click to Begin
      </div>
    </div>
  );
});
IntroSlide.displayName = "IntroSlide";

// --- Metadata for Search & Slide Definition ---
const SLIDE_METADATA = [
  { id: 0, title: "Introduction", keywords: ["intro", "start", "biomass", "forest"], component: IntroSlide },
  { id: 1, title: "Agenda", keywords: ["agenda", "overview", "topics"], component: AgendaSlide },

  // Problem Statement Section
  { id: 2, title: "Section: Problem Statement", keywords: ["section", "problem"], component: SectionProblemStatement },
  { id: 3, title: "What is a Carbon Credit?", keywords: ["carbon", "credit", "market"], component: CarbonCreditSlide },
  { id: 4, title: "Why Calculate It?", keywords: ["calculation", "policy", "accounting"], component: ImportanceOfCalculationSlide },
  { id: 5, title: "Why Biomass?", keywords: ["biomass", "focus", "agb"], component: BiomassFocusSlide },
  { id: 6, title: "Old Methods: Physical", keywords: ["lidar", "survey", "old"], component: ExistingMethodsPhysicalSlide },
  { id: 7, title: "Limitations & Solutions", keywords: ["solution", "transformer", "efficiency", "ai", "cnn", "rnn"], component: CurrentLimitationsSolutionsSlide },

  // Dataset Section
  { id: 8, title: "Section: Dataset Overview", keywords: ["section", "dataset"], component: SectionDataset },
  { id: 9, title: "Dataset Overview", keywords: ["dataset", "scope", "finland", "biomassters"], component: DatasetOverviewSlide },
  { id: 10, title: "Data Collection: Input", keywords: ["sentinel", "radar", "optical", "s1", "s2"], component: DataCollectionInputSlide },
  { id: 11, title: "Data Collection: Truth", keywords: ["lidar", "ground truth", "agb", "pipeline"], component: DataCollectionGroundTruthSlide },

  // Experiments Section
  { id: 12, title: "Section: Experiments & Results", keywords: ["section", "experiments"], component: SectionExperiments },
  { id: 13, title: "Input Structure", keywords: ["input", "tensor", "layers", "time series"], component: InputDataSlide },
  { id: 14, title: "Stage 1: Temporal", keywords: ["stage 1", "pixel", "inference", "temporal", "1d cnn"], component: Slide2 },
  { id: 15, title: "Stage 2: Spatial", keywords: ["stage 2", "spatial", "refinement", "context"], component: Slide3 },
  { id: 16, title: "Design: Configuration", keywords: ["config", "patch", "size", "64x64"], component: ConfigurationChoiceSlide },
  { id: 17, title: "Design: Epochs", keywords: ["epochs", "training", "loss", "convergence"], component: EpochStopChoiceSlide },
  { id: 18, title: "Design: Adaptive Cropping", keywords: ["cropping", "adaptive", "saliency"], component: AdaptiveCroppingSlide },
  { id: 19, title: "Design: Scaling", keywords: ["scaling", "1M", "128x128", "size"], component: ScalingSlide },
  { id: 20, title: "Design: Temporal", keywords: ["temporal", "noise", "transformer", "attention"], component: TemporalAnalysisSlide },
  { id: 21, title: "Design: Diminishing Returns", keywords: ["model", "size", "cost", "plateau"], component: ModelDesignSlide },
  { id: 22, title: "Design: Architecture", keywords: ["architecture", "unet", "transformer", "sweet spot"], component: ModelArchitectureSlide },
  { id: 23, title: "Result: Paper Acceptance", keywords: ["paper", "publication", "hong kong", "icasis"], component: PaperAcceptanceSlide },

  // AI Pipeline Section
  { id: 24, title: "Section: AI Pipeline", keywords: ["section", "pipeline"], component: SectionPipeline },
  { id: 25, title: "Pipeline: Overview", keywords: ["pipeline", "process", "overview"], component: AIPipelineOverviewSlide },
  { id: 26, title: "Pipeline: Demo", keywords: ["video", "demo", "pipeline"], component: AIPipelineVideoSlide },

  //Limitation
  //Techinical definitions
];


// --- Main Presentation Component ---

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const activeSlideRef = useRef<SlideHandle>(null);

  // Search State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Define Slide Deck from Metadata
  const slides = useMemo(() => SLIDE_METADATA.map(s => s.component).filter(Boolean), []);

  const totalSlides = slides.length;

  // Initial Update: Ensure we don't start out of bounds if slides change
  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(0);
    }
  }, [totalSlides, currentSlide]);

  // Navigation Logic
  const navigate = (direction: 1 | -1) => {
    if (activeSlideRef.current) {
      const handled = direction === 1
        ? activeSlideRef.current.next()
        : activeSlideRef.current.prev();

      if (handled) return; // Slide handled the navigation (internal effect)
    }

    // Move Between Slides
    setCurrentSlide((prev) => {
      const next = prev + direction;
      return Math.max(0, Math.min(next, totalSlides - 1));
    });
  };

  // Global Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if searching
      if (searchOpen) {
        if (e.key === "Escape") setSearchOpen(false);
        return;
      }

      if (e.key === "ArrowRight" || e.key === "Space") {
        navigate(1);
      } else if (e.key === "ArrowLeft") {
        navigate(-1);
      } else if (e.key === "/" || (e.metaKey && e.key === "k")) {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 10);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, searchOpen, totalSlides]);

  // Handle Global Click for Navigation
  const handleGlobalClick = (e: React.MouseEvent) => {
    // If search is open, do nothing (overlay handles it)
    if (searchOpen) return;

    // Simple navigation on click
    navigate(1);
  };

  // Filtered Suggestions
  const suggestions = useMemo(() => {
    if (!searchQuery) {
      // Return neighbors
      return SLIDE_METADATA.filter(s => Math.abs(s.id - currentSlide) <= 2 && s.id !== currentSlide);
    }
    const lower = searchQuery.toLowerCase();
    return SLIDE_METADATA.filter(s =>
      s.title.toLowerCase().includes(lower) ||
      s.keywords.some(k => k.includes(lower))
    );
  }, [searchQuery, currentSlide]);


  return (
    <main
      className="relative h-screen w-screen overflow-hidden bg-background text-foreground font-sans selection:bg-primary-muted selection:text-primary-foreground"
      onClick={handleGlobalClick}
    >

      {/* Background Ambience (Light Mode) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bg-primary/5 rounded-full blur-[120px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] mix-blend-multiply" />
        <div className="absolute bg-secondary/5 rounded-full blur-[100px] bottom-0 right-0 w-[600px] h-[600px] mix-blend-multiply" />
      </div>

      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none mix-blend-multiply" />

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1.5 bg-primary z-50 transition-all duration-500" style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }} />

      {/* Search Bar */}
      <div
        className="absolute top-6 left-6 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence>
          {!searchOpen ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 p-2 px-3 rounded-full bg-surface shadow-sm border border-gray-200 hover:bg-surface-highlight cursor-pointer text-muted text-sm transition-colors"
              onClick={() => { setSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 10); }}
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">Jump to...</span>
              <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded ml-2 font-mono text-muted">/</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-[300px] bg-background border border-gray-200 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center px-3 py-3 border-b border-gray-100">
                <Search className="w-4 h-4 text-primary mr-2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  className="bg-transparent border-none outline-none text-sm text-foreground w-full placeholder-muted"
                  placeholder="Type slide name or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && suggestions.length > 0) {
                      setCurrentSlide(suggestions[0].id);
                      setSearchOpen(false);
                    }
                  }}
                />
                <div
                  className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => setSearchOpen(false)}
                >
                  <span className="text-xs text-muted">ESC</span>
                </div>
              </div>
              <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                {suggestions.map((s, i) => (
                  <div
                    key={s.id}
                    className={`px-4 py-2 text-sm cursor-pointer border-l-2 hover:bg-gray-50 transition-colors flex items-center justify-between ${s.id === currentSlide ? "border-primary bg-primary/10" : "border-transparent text-muted"}`}
                    onClick={() => {
                      setCurrentSlide(s.id);
                      setSearchOpen(false);
                    }}
                  >
                    <span>{s.title}</span>
                    {i === 0 && searchQuery && <span className="text-xs text-primary font-mono">↵</span>}
                  </div>
                ))}
                {suggestions.length === 0 && (
                  <div className="px-4 py-3 text-xs text-muted text-center">No slides found</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pages */}
      <div className="relative w-full h-full pointer-events-none">
        {slides.map((SlideComponent, index) => {
          if (!SlideComponent) return null;
          const SlideComp = SlideComponent as any;
          return (
            <Slide key={index} isActive={currentSlide === index}>
              <div className="w-full h-full pointer-events-auto">
                <SlideComp
                  ref={currentSlide === index ? activeSlideRef : null}
                  isActive={currentSlide === index}
                />
              </div>
            </Slide>
          );
        })}
      </div>

    </main>
  );
}