"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { techStack } from "@/constants/techStack";

export default function TechStack() {
  const itemsRef = useRef([]);

  const handleEnter = (index) => {
    gsap.to(itemsRef.current[index].firstElementChild, {
      scale: 1.2,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleLeave = (index) => {
    gsap.to(itemsRef.current[index].firstElementChild, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };
  return (
    <section className="mx-auto w-full max-w-200 px-6 py-20 xl:py-30">
      <h2 className="text-lg font-medium xl:text-xl">Tech Stack</h2>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
        {techStack.map(({ name, icon: Icon }, index) => (
          <div
            key={name}
            ref={(element) => {
              itemsRef.current[index] = element;
            }}
            onMouseEnter={() => handleEnter(index)}
            onMouseLeave={() => handleLeave(index)}
            className="flex h-15 w-15 cursor-pointer items-center justify-center rounded-2xl bg-[#212121] text-white "
          >
            <Icon className="h-7 w-7" />
          </div>
        ))}
      </div>
    </section>
  );
}
