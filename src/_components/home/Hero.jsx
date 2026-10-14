
"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Caveat } from "next/font/google";


const caveat = Caveat({
  subsets: ["latin"],
  weight: "600",
  display:"swap"
});


export default function Hero() {
  const roleRef = useRef(null);
  const locationRef = useRef(null);
  const [isLocationPreviewOpen, setIsLocationPreviewOpen] = useState(false);

  const showPreview = (ref) => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const hidePreview = (ref) => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      autoAlpha: 0,
      y: 8,
      scale: 0.95,
      duration: 0.2,
      ease: "power2.in",
    });
  };

  const showLocationPreview = () => {
    setIsLocationPreviewOpen(true);
    showPreview(locationRef);
  };

  const hideLocationPreview = () => {
    setIsLocationPreviewOpen(false);
    hidePreview(locationRef);
  };

  return (
    <section className="mx-auto w-full max-w-500 px-6 pt-5 sm:px-10">
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-60 bg-neutral-900/10 backdrop-blur-[5px] transition-opacity duration-300 ${
          isLocationPreviewOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative mx-auto flex aspect-10/7 w-full overflow-hidden sm:aspect-auto sm:h-45 sm:w-100 lg:w-150 xl:w-200  xl:h-65">
        <Image
          src="/banner.gif"
          alt="Underwater landscape"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-center pt-14 sm:pt-16">
        <div className="relative h-22.5 w-22.5 overflow-hidden rounded-xl">
          <Image
            src="/profile.jpg"
            alt="Dhruv Jha"
            fill
            priority
            sizes="90px"
            className="object-cover"
          />
        </div>

        <div className="mt-14 flex items-baseline justify-center gap-3">
          <span className="text-sm text-neutral-500 sm:text-base ">
            Hey I'm,
          </span>

          <h1 className={`${caveat.className} text-6xl xl:text-7xl`}>
            Dhruv Jha
          </h1>
        </div>

        <p className="mt-10 text-center text-sm xl:text-md text-neutral-500 sm:text-base">
          a 21 yo{" "}
          <span className="relative inline-block">
            <button
              type="button"
              className="underline decoration-dotted decoration-neutral-400 underline-offset-4  cursor-pointer"
              onMouseEnter={() => showPreview(roleRef)}
              onMouseLeave={() => hidePreview(roleRef)}
              onFocus={() => showPreview(roleRef)}
              onBlur={() => hidePreview(roleRef)}
            >
              Design Engineer
            </button>

            <span
              ref={roleRef}
              className="invisible pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 w-36 -translate-x-1/2 rounded-xl border border-neutral-200 p-3 bg-white text-center text-xs text-neutral-700 shadow-lg"
            >
              Design meets code.
            </span>
          </span>{" "}
          based in{" "}
          <span className="relative inline-block">
            <button
              type="button"
              className="underline decoration-dotted decoration-neutral-400 underline-offset-4 transition-colors cursor-pointer"
              onMouseEnter={showLocationPreview}
              onMouseLeave={hideLocationPreview}
              onFocus={showLocationPreview}
              onBlur={hideLocationPreview}
            >
              Delhi
            </button>

            <span
              ref={locationRef}
              className="invisible pointer-events-none absolute bottom-full left-1/2 z-70 mb-1 w-36 -translate-x-1/2  p-2"
            >
              <Image
                src="/delhi.svg"
                alt="Delhi"
                width={66}
                height={76}
                className="mx-auto"
              />
            </span>
          </span>
        </p>

        <p className="mt-6 max-w-100 text-center text-xs lg:text-sm 2xl:text-md leading-relaxed text-neutral-500">
          I love building clean, modern websites where design,
          functionality, and even the smallest details matter.
        </p>
      </div>
    </section>
  );
}
