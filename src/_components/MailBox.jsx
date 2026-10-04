"use client";

import { useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function MailBox() {
  const avatarRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(avatarRef.current, {
      scale: 1.1,
      rotate: -5,
      duration: 0.35,
      ease: "back.out(1.7)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(avatarRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.35,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="mail-card"
    >
      <div className="relative z-10 text-white">
        <h1 className="text-3xl font-semibold leading-8">
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
        className="mail-action"
      >
        <img
          ref={avatarRef}
          src="/favicon.ico"
          alt=""
          className="w-7 h-7 object-contain"
        />

        <span className="text-purple-400 font-bold">Let's Talk</span>
      </Link>
    </div>
  );
}
