"use client";

import { use, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function MailBox() {
  const cardRef = useRef(null);
  const mailIconRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(mailIconRef.current, {
      scale: 1.4,
      rotate: -8,
   y:0,
      duration: 0.5,
      ease: "back.out(1.8)",
    });
    gsap.to(textRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(mailIconRef.current, {
      scale: 1,
      rotation: 0,
      y:0,
      duration: 0.5,
      ease: "power2.inOut",
    });
    gsap.to(textRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <Link
      href="/mailbox"
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-45  overflow-hidden p-4 flex flex-col items-center justify-center"
    >
      <img
        src="/mail.png"
        alt="mail png"
        ref={mailIconRef}
        className="relative w-20 h-20 object-contain"
      />

      
    </Link>
  );
}
