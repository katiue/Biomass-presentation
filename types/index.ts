// Shared types for the presentation

export interface SlideHandle {
    next: () => boolean; // Return true if handled internally, false if should move to next slide
    prev: () => boolean; // Return true if handled internally, false if should move to prev slide
}

export interface SlideProps {
    isActive: boolean;
}
