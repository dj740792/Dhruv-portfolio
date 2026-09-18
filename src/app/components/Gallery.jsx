"use client";

import { useRef } from "react";
import gsap from "gsap";

export default function Gallery() {
  const cardRef = useRef(null);
  const leftPreviewRef = useRef(null);
  const rightPreviewRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseEnter = () => {
    // 1. Background transition to purple gradient
    gsap.to(bgRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    // 2. Text turns white
    gsap.to(textRef.current, {
      color: "#ffffff",
      duration: 0.3,
    });

    // 3. Left design preview slides up and straightens slightly
    gsap.to(leftPreviewRef.current, {
      y: -12,
      rotate: -4,
      scale: 1.05,
      duration: 0.4,
      ease: "back.out(1.7)",
    });

    // 4. Right design preview slides up and overlaps
    gsap.to(rightPreviewRef.current, {
      y: -18,
      rotate: 6,
      scale: 1.05,
      duration: 0.4,
      delay: 0.05,
      ease: "back.out(1.7)",
    });
  };

  const handleMouseLeave = () => {
    // Reset background
    gsap.to(bgRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });

    // Reset text color
    gsap.to(textRef.current, {
      color: "#6b7280", // neutral-500
      duration: 0.3,
    });

    // Reset cards to default rest positions
    gsap.to([leftPreviewRef.current, rightPreviewRef.current], {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.inOut",
    });

    gsap.to(leftPreviewRef.current, { rotate: -8, duration: 0.4 });
    gsap.to(rightPreviewRef.current, { rotate: 8, duration: 0.4 });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[180px]  shadow-sm overflow-hidden p-4 flex flex-col justify-between cursor-pointer select-none group"
    >
      {/* Purple Gradient Overlay */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-500 opacity-0 transition-none pointer-events-none"
      />

      {/* Card Header */}
      <h2
        ref={textRef}
        className="text-sm font-medium text-neutral-500 z-10 pointer-events-none leading-tight"
      >
        Design
        <br />
        Gallery
      </h2>

      {/* Floating Design Cards Preview Container */}
      <div className="relative w-full h-24 flex justify-center items-end z-10 pointer-events-none">
        {/* Left Card ("OASIS") */}
        <div
          ref={leftPreviewRef}
          className="absolute -bottom-2 left-2 w-28 h-36 bg-neutral-100 rounded-xl shadow-md border border-white/40 overflow-hidden -rotate-8 transform-gpu origin-bottom-left"
        >
          <img
            src="/gallery/oasis-preview.jpg" // replace with your asset path
            alt="Oasis Design"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Card ("ARCH") */}
        <div
          ref={rightPreviewRef}
          className="absolute -bottom-4 right-1 w-28 h-36 bg-neutral-100 rounded-xl shadow-md border border-white/40 overflow-hidden rotate-8 transform-gpu origin-bottom-right"
        >
          <img
            src="/gallery/arch-preview.jpg" // replace with your asset path
            alt="Arch Design"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}