"use client";

import Image from "next/image";
import { useState } from "react";
import { Caveat } from "next/font/google";
import { delhiPhotos } from "@/constants/about";
import OceanBanner from "../ui/OceanBanner";
const caveat = Caveat({
  subsets: ["latin"],

  display: "swap",
});

export default function Hero() {
  const [hoveredPreview, setHoveredPreview] = useState(null);
  const [focusedPreview, setFocusedPreview] = useState(null);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const activePreview = hoveredPreview ?? focusedPreview;
  const isLocationPreviewOpen = activePreview === "location";

  return (
    <section className="mx-auto w-full max-w-500 px-6 pt-5 sm:px-10">
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-60 bg-neutral-900/10 backdrop-blur-[5px] transition-opacity duration-300 ${
          isLocationPreviewOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative mx-auto flex aspect-10/7 w-full overflow-hidden sm:aspect-auto sm:h-45 sm:w-130 md:h-70  xl:h-85 xl:w-160 lg:h-60 lg:w-130">
      <OceanBanner  /> 
           </div>

      <div className="flex flex-col items-center pt-10 ">
        <button
          type="button"
          onClick={() => setIsImageOpen(true)}
          className="relative h-18 w-18 xl:h-22 xl:w-22 cursor-pointer overflow-hidden rounded-xl"
          aria-label="View profile picture"
        >
          <Image
            src="/profile.jpg"
            alt="Dhruv Jha"
            fill
            priority
            sizes="200px"
            className="object-cover"
          />
        </button>

        <div className="mt-14 flex items-baseline justify-center gap-3">
          <span className="text-sm text-neutral-500 sm:text-base">
            Hey I'm,
          </span>

          <h1 className={`${caveat.className} text-5xl`}>
            Dhruv Jha
          </h1>
        </div>

        <p className="mt-10 text-center text-sm text-neutral-500 sm:text-base xl:text-md">
          a 21 yo{" "}
          <span className="relative inline-block">
            <button
              type="button"
              className="underline decoration-dotted decoration-neutral-400 underline-offset-4"
              onMouseEnter={() => setHoveredPreview("role")}
              onMouseLeave={() => setHoveredPreview(null)}
              onFocus={(event) =>
                setFocusedPreview(
                  event.currentTarget.matches(":focus-visible") ? "role" : null,
                )
              }
              onBlur={() => setFocusedPreview(null)}
            >
              Design Engineer
            </button>
          </span>{" "}
          based in{" "}
          <span className="relative inline-block">
            <button
              type="button"
              className="cursor-pointer underline decoration-dotted decoration-neutral-400 underline-offset-4"
              onMouseEnter={() => setHoveredPreview("location")}
              onMouseLeave={() => setHoveredPreview(null)}
              onFocus={(event) =>
                setFocusedPreview(
                  event.currentTarget.matches(":focus-visible")
                    ? "location"
                    : null,
                )
              }
              onBlur={() => setFocusedPreview(null)}
            >
              Delhi
            </button>

            <span
              className={`pointer-events-none absolute bottom-full left-1/10 z-70 mb-3 h-44 w-56 -translate-x-1/2 transition-all duration-200 ease-out ${
                isLocationPreviewOpen
                  ? "visible translate-y-0 scale-100 opacity-100"
                  : "invisible translate-y-2 scale-95 opacity-0"
              }`}
            >
              {delhiPhotos.map((photo, index) => (
                <span
                  key={photo.src}
                  className="absolute left-1/2 top-1/2 w-32 border border-white bg-white p-1 shadow-lg"
                  style={{
                    zIndex: index,
                    transform: `translate(
          ${index === 0 ? "-48%" : "35%"},
          -50%
        ) rotate(${photo.rotation})`,
                  }}
                >
                  <span className="relative block aspect-4/5 w-full overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </span>
                </span>
              ))}
            </span>
          </span>
        </p>

        <p className="mt-6 max-w-2xl text-center text-xs leading-relaxed text-neutral-500 lg:text-sm 2xl:text-[16px]">
          I use Next Js, Tailwind, Motion or Gsap to design and develop modern websites where design, functionality, and even the smallest details matter.
        </p>
    
      </div>

      {isImageOpen && (
        <div
          className="fixed inset-0 z-100 flex cursor-pointer items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          onClick={() => setIsImageOpen(false)}
        >
          <div
            className="relative h-[80vh] w-full max-w-3xl "
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src="/profile.jpg"
              alt="Dhruv Jha"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}
