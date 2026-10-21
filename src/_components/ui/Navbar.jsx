"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const pathname = usePathname();

  const profileRef = useRef(null);
  const folderRef = useRef(null);
  const contactRef = useRef(null);

  const handleEnter = (ref) => {
    gsap.to(ref.current, {
      scale: 1.08,
      y: -3,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleLeave = (ref) => {
    gsap.to(ref.current, {
      scale: 1,
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const isGalleryPage = pathname === "/gallery";

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="flex h-20 w-[calc(100vw-40px)] max-w-70 items-center justify-between rounded-2xl border border-white/50 bg-white/30 px-3 shadow-[0_8px_30px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-xl backdrop-saturate-170 sm:px-8">
        <Link
          href="/about"
          ref={profileRef}
          onMouseEnter={() => handleEnter(profileRef)}
          onMouseLeave={() => handleLeave(profileRef)}
          className="relative h-13 w-13 overflow-hidden rounded-xl"
        >
          <Image
            src="/dhruv.jpg"
            alt="About"
            fill
            sizes="52px"
            className="object-cover"
          />
        </Link>

        <Link
          href="/gallery"
          ref={folderRef}
          onMouseEnter={() => handleEnter(folderRef)}
          onMouseLeave={() => handleLeave(folderRef)}
          className="relative h-12 w-12"
        >
          <Image
            src={isGalleryPage ? "/folder-open.png" : "/folder.png"}
            alt="Work"
            fill
            sizes="48px"
            className="object-contain"
          />
        </Link>

        <Link
          href="/contact"
          ref={contactRef}
          onMouseEnter={() => handleEnter(contactRef)}
          onMouseLeave={() => handleLeave(contactRef)}
          className="relative h-12 w-12"
        >
          <Image
            src="/send.jpg"
            alt="Contact"
            fill
            sizes="48px"
            className="object-contain"
          />
        </Link>
      </div>
    </nav>
  );
}