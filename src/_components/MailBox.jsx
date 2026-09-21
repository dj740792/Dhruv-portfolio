"use client";

import { useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function MailBox() {
  const buttonRef = useRef(null);
  const avatarRef = useRef(null);
  const arrowRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      y: -3,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(avatarRef.current, {
      scale: 1.1,
      rotate: -5,
      duration: 0.35,
      ease: "back.out(1.7)",
    });

    gsap.to(arrowRef.current, {
      x: 3,
      y: -2,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });

    gsap.to(avatarRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.35,
      ease: "power2.inOut",
    });

    gsap.to(arrowRef.current, {
      x: 0,
      y: 0,
      duration: 0.25,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-45 overflow-hidden rounded-2xl bg-[#928afb] p-4 flex flex-col justify-between"
    >
      <div className="relative z-10 text-white">
        <h1 className="text-2xl leading-7">
          Have an
          <br />
          Idea?
        </h1>

        <p className="mt-2 text-md leading-5">
          Let's build it
          <br />
          together
        </p>
      </div>

      <Link
        href="/mailbox"
        ref={buttonRef}
        className="relative z-10 w-40 h-10 bg-white rounded-lg flex items-center justify-center gap-3"
      >
        <img
          ref={avatarRef}
          src="/favicon.ico"
          alt=""
          className="w-7 h-7 object-contain"
        />

        <span className="text-[#928afb] font-bold">Let's Talk</span>
      </Link>
    </div>
  );
}
