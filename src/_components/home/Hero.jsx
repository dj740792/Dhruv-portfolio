"use client";

import Image from "next/image";
import { useState } from "react";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  
  display: "swap",
});

export default function Hero() {
  const [hoveredPreview, setHoveredPreview] = useState(null);
  const [focusedPreview, setFocusedPreview] = useState(null);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const activePreview = hoveredPreview ?? focusedPreview;
  const isRolePreviewOpen = activePreview === "role";
  const isLocationPreviewOpen = activePreview === "location";

  return (
    <section className="mx-auto w-full max-w-500 px-6 pt-5 sm:px-10">
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-60 bg-neutral-900/10 backdrop-blur-[5px] transition-opacity duration-300 ${
          isLocationPreviewOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="hero-banner relative mx-auto flex aspect-10/7 w-full overflow-hidden sm:aspect-auto sm:h-45 sm:w-100 xl:h-75 xl:w-150 lg:h-60 lg:w-130">
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
        <button
          type="button"
          onClick={() => setIsImageOpen(true)}
          className="relative h-22 w-22 cursor-pointer overflow-hidden rounded-xl"
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

          <h1 className={`${caveat.className} text-6xl xl:text-7xl`}>
            Dhruv Jha
          </h1>
        </div>

        <p className="mt-10 text-center text-sm text-neutral-500 sm:text-base xl:text-md">
          a 21 yo{" "}
          <span className="relative inline-block">
            <button
              type="button"
              className="cursor-pointer underline decoration-dotted decoration-neutral-400 underline-offset-4"
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
              className={`pointer-events-none absolute bottom-full left-1/2 z-70 mb-1 w-36 -translate-x-1/2 p-2 transition-all duration-200 ease-out ${
                isLocationPreviewOpen
                  ? "visible translate-y-0 scale-100 opacity-100"
                  : "invisible translate-y-2 scale-95 opacity-0"
              }`}
            >
              <Image
                src="/delhi.svg"
                alt="Delhi"
                width={76}
                height={76}
                className="mx-auto"
              />
            </span>
          </span>
        </p>

        <p className="mt-6 max-w-100 text-center text-xs leading-relaxed text-neutral-500 lg:text-sm 2xl:text-md">
          I love building websites where design,
          functionality, and even the smallest details matter.
        </p>
      </div>

      {isImageOpen && (
        <div
          className="fixed inset-0 z-100 flex cursor-pointer items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          onClick={() => setIsImageOpen(false)}
        >
          <div
            className="relative h-[80vh] w-full max-w-3xl"
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