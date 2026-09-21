"use client";

import { useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function DesignGalleryCard() {
  const cardRef = useRef(null);
  const leftPreviewRef = useRef(null);
  const rightPreviewRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(bgRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(textRef.current, {
      scale: 1.8,
      color: "#ffffff",
      duration: 0.4,
      fontWeight: 700,
      ease: "power2.out",
    });

    gsap.to(leftPreviewRef.current, {
      y: -3,
      rotate: -12,
      scale: 1.09,
      duration: 0.4,
      ease: "back.out(1.7)",
    });

    gsap.to(rightPreviewRef.current, {
      y: -4,
      rotate: 12,
      scale: 1.09,
      duration: 0.4,
      delay: 0.05,
      ease: "back.out(1.7)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(bgRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });

    gsap.to(textRef.current, {
      scale: 1,
      fontWeight: 500,
      color: "#404040",
      duration: 0.4,
      ease: "power2.inOut",
    });

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
    <Link
      href="/gallery"
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-45  overflow-hidden p-4 flex flex-col justify-between "
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-linear-to-br from-[#d5d3f9] via-[#b3aef3] to-[#928afb] opacity-0 transition-none pointer-events-none "
      />

      <h2
        ref={textRef}
        className="text-sm uppercase text-neutral-700 z-10 pointer-events-none leading-4  origin-top-left"
      >
        Design
        <br />
        Gallery
      </h2>

      {/* Floating Cards  */}
      <div className="relative w-full h-24 flex justify-center items-end z-10 pointer-events-none">
        {/* Left Card  */}
        <div
          ref={leftPreviewRef}
          className="absolute -bottom-14 left-2 w-28 h-32 bg-neutral-100   overflow-hidden -rotate-8 transform-gpu origin-bottom-left"
        >
          <img
            src="/intro.jpg"
            alt="about jpg"
            className="w-full border border-neutral-200 h-full object-cover"
          />
        </div>

        {/* Right Card*/}
        <div
          ref={rightPreviewRef}
          className="absolute -bottom-14 right-1 w-28 h-32 overflow-hidden rotate-8 transform-gpu origin-bottom-right"
        >
          <img
            src="/cta.png"
            alt="cta png"
            className="w-full h-full object-cover border border-neutral-200"
          />
        </div>
      </div>
    </Link>
  );
}
