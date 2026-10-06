"use client";

import { useEffect, useRef, useState } from "react";
import { hobbies, HobbiesDialogue } from "@/constants";
import gsap from "gsap";
import Link from "next/link";

export default function HobbiesBox() {
  const cardRef = useRef(null);
  const iconsRef = useRef([]);
  const dialogueRef = useRef(null);
  const originOffsetsRef = useRef([]);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1100px)");

    const handleMediaChange = (event) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    const icons = iconsRef.current.filter(Boolean);
    const dialogue = dialogueRef.current;
    const card = cardRef.current;

    if (!icons.length || !card) return;

    gsap.killTweensOf(icons);
    gsap.killTweensOf(dialogue);

    if (isDesktop) {
      const cardRect = card.getBoundingClientRect();
      const originX = cardRect.left + cardRect.width / 2;
      const originY = cardRect.top + cardRect.height * 0.78;

      originOffsetsRef.current = icons.map((icon) => {
        const rect = icon.getBoundingClientRect();

        return {
          x: originX - (rect.left + rect.width / 2),
          y: originY - (rect.top + rect.height / 2),
        };
      });

      icons.forEach((icon, index) => {
        const offset = originOffsetsRef.current[index];

        gsap.set(icon, {
          x: offset.x,
          y: offset.y,
          scale: 0.4,
          opacity: 0,
        });
      });

      gsap.set(dialogue, {
        opacity: 1,
        scale: 1,
      });
    } else {
      gsap.set(icons, {
        clearProps: "transform,scale,opacity",
      });

      gsap.set(dialogue, {
        opacity: 1,
        scale: 1,
      });
    }
  }, [isDesktop]);

  const handleCardEnter = () => {
    if (!isDesktop) return;

    const icons = iconsRef.current.filter(Boolean);

    if (!icons.length || !originOffsetsRef.current.length) return;

    icons.forEach((icon, index) => {
      const offset = originOffsetsRef.current[index];

      gsap.killTweensOf(icon);

      gsap.set(icon, {
        x: offset.x,
        y: offset.y,
        scale: 0.4,
        opacity: 1,
      });
    });

    gsap.killTweensOf(dialogueRef.current);

    gsap.to(dialogueRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(icons, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.65,
      stagger: 0.09,
      ease: "back.out(1.5)",
    });
  };

  const handleCardLeave = () => {
    if (!isDesktop) return;

    const icons = iconsRef.current.filter(Boolean);

    icons.forEach((icon, index) => {
      const offset = originOffsetsRef.current[index];

      if (!offset) return;

      gsap.killTweensOf(icon);

      gsap.to(icon, {
        x: offset.x,
        y: offset.y,
        scale: 0.4,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    });

    gsap.killTweensOf(dialogueRef.current);

    gsap.to(dialogueRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.5)",
    });
  };

  const handleIconEnter = (event) => {
    if (!isDesktop) return;

    gsap.to(event.currentTarget, {
      scale: 1.2,
      duration: 0.25,
      ease: "back.out(1.7)",
    });
  };

  const handleIconLeave = (event) => {
    if (!isDesktop) return;

    gsap.to(event.currentTarget, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleCardEnter}
      onMouseLeave={handleCardLeave}
      className="relative h-full min-h-45 w-full cursor-pointer overflow-hidden"
    >
      <div
        ref={dialogueRef}
        className="pointer-events-none absolute right-[5%] top-[35%] z-20 origin-bottom-left"
        style={{
          opacity: 1,
          scale: 1,
        }}
      >
        <div className="relative w-[min(10rem,80vw)] hidden lg:block rounded-xl bg-neutral-200 px-4 py-2 text-[12px] leading-tight text-neutral-700">
          <p>{HobbiesDialogue}</p>

          <div className="absolute -bottom-1.25 left-2.5 h-4 w-3 rotate-45 bg-neutral-200" />
        </div>
      </div>

      {hobbies.map((item, index) => (
        <Link
          key={item.name}
          href={item.Href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          className="pointer-events-none absolute inset-0"
          tabIndex={isDesktop ? -1 : 0}
        >
          <img
            ref={(el) => {
              iconsRef.current[index] = el;
            }}
            src={item.icon}
            alt={item.name}
            onMouseEnter={handleIconEnter}
            onMouseLeave={handleIconLeave}
            className={`pointer-events-auto absolute z-10 object-contain ${
              isDesktop ? "opacity-0" : "opacity-100"
            } ${item.className}`}
          />
        </Link>
      ))}

      <img
        src="/dhruv.png"
        alt=""
        className="pointer-events-none absolute -bottom-2.5 left-1/2 z-30 w-[clamp(5rem,18vw,7.5rem)] -translate-x-1/2 object-contain"
      />
    </div>
  );
}