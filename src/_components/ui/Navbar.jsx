"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const profileRef = useRef(null);
  const folderRef = useRef(null);

  const handleEnter = (ref) => {
    gsap.to(ref.current, {
      y: -1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleLeave = (ref) => {
    gsap.to(ref.current, {
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="flex h-22 w-[calc(100vw-40px)] max-w-45 items-center justify-center gap-8 rounded-2xl border border-white/50 bg-white/30 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-xl backdrop-saturate-170 ">
        <Link
          href="/about"
          ref={profileRef}
          onMouseEnter={() => handleEnter(profileRef)}
          onMouseLeave={() => handleLeave(profileRef)}
          className="flex flex-col items-center gap-1"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-lg lg:h-11 lg:w-11">
            <Image
              src="/dhruv.jpg"
              alt="About"
              fill
              sizes="52px"
              className="object-cover"
            />
          </div>

          <span className="text-sm text-neutral-700">
            about
          </span>
        </Link>

        <Link
          href="/#works"
          ref={folderRef}
          onMouseEnter={() => handleEnter(folderRef)}
          onMouseLeave={() => handleLeave(folderRef)}
          className="flex flex-col items-center gap-1"
        >
          <div className="relative h-10 w-10 lg:h-11 lg:w-11">
            <Image
              src="/folder.png"
              alt="Works"
              fill
              sizes="48px"
              className="object-contain"
            />
          </div>

          <span className="text-sm text-neutral-700">
            works
          </span>
        </Link>
      </div>
    </nav>
  );
}