"use client";
import { hobbies, HobbiesDialogue } from "@/constants";
import gsap from "gsap";
import Link from "next/link";

export default function HobbiesBox() {
  const handleIconEnter = (event) => {
    gsap.to(event.currentTarget, {
      scale: 1.12,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  const handleIconLeave = (event) => {
    gsap.to(event.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <div className="relative w-full h-full min-h-45 overflow-hidden ">
      <div className="absolute left-1/2 top-[35%] right-[45%] z-20 -translate-x-1/2">
        <div className="relative w-40 rounded-xl bg-neutral-200 px-4 py-2 text-[12px] leading-tight text-neutral-700">
          <p>{HobbiesDialogue}</p>
          <div className="absolute -bottom-1.25 left-1.2 h-4 w-3 rotate-45 bg-neutral-200" />
        </div>
      </div>

      {hobbies.map((item) => (
        <Link key={item.name} href={item.Href}>
          <img
            src={item.icon}
            alt={item.name}
            onMouseEnter={handleIconEnter}
            onMouseLeave={handleIconLeave}
            className={`absolute z-10 object-contain cursor-pointer ${item.className}`}
          />
        </Link>
      ))}

      <img
        src="/dhruv.png"
        alt=""
        className="absolute -bottom-2.5 left-1/2 z-30 w-30 -translate-x-1/2 object-contain pointer-events-none"
      />
    </div>
  );
}
