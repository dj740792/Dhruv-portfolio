"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import {
  navigationItems,
  socialItems,
  contactItem,
  resumeItem,
} from "@/constants/navbar";

const surface =
  "border border-white/10 bg-[#202020] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.20),inset_0_2px_5px_rgba(255,255,255,0.035),inset_0_-2px_4px_rgba(0,0,0,0.35),0_8px_24px_rgba(0,0,0,0.16)]";

const buttonStyle =
  "grid h-10 w-11 shrink-0 place-items-center rounded-xl text-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

export default function Navbar() {
  const socialRef = useRef(null);
  const [open, setOpen] = useState(false);

  const animateIcon = (event, scale, opacity) => {
    const icon = event.currentTarget.querySelector(".nav-icon");
    if (!icon) return;

    gsap.to(icon, {
      scale,
      opacity,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const showSocials = () => {
    const menu = socialRef.current;
    if (!menu) return;

    setOpen(true);
    gsap.killTweensOf(menu);

    gsap.to(menu, {
      autoAlpha: 1,
      y: 0,
      duration: 0.2,
      pointerEvents: "auto",
      overwrite: true,
    });

    gsap.fromTo(
      menu.querySelectorAll(".social-link"),
      { y: 20, scale: 0.7, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.35,
        stagger: 0.09,
        ease: "back.out(1.5)",
        overwrite: true,
      },
    );
  };

  const hideSocials = () => {
    const menu = socialRef.current;
    if (!menu) return;

    setOpen(false);
    gsap.killTweensOf(menu);

    gsap.to(menu, {
      autoAlpha: 0,
      y: 8,
      duration: 0.18,
      pointerEvents: "none",
      overwrite: true,
    });
  };
  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-[max(20px,env(safe-area-inset-bottom))] left-1/2 z-50 flex -translate-x-1/2 items-center gap-3"
    >
      <div
        className={`${surface} flex h-14.5 w-85 items-center justify-between rounded-[19px] px-2.5`}
      >
        {navigationItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            className={buttonStyle}
            onMouseEnter={(e) => animateIcon(e, 1.5, 1.4)}
            onMouseLeave={(e) => animateIcon(e, 1, 1)}
            onFocus={(e) => animateIcon(e, 1.15, 1.4)}
            onBlur={(e) => animateIcon(e, 1, 0.75)}
          >
            <Icon className="nav-icon h-5.25 w-5.25" />
          </Link>
        ))}
        <div
          className="relative flex h-full items-center"
          onMouseEnter={showSocials}
          onMouseLeave={hideSocials}
          onFocus={showSocials}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              hideSocials();
            }
          }}
        >
          <button
            type="button"
            aria-label={contactItem.label}
            aria-expanded={open}
            className={buttonStyle}
            onClick={() => (open ? hideSocials() : showSocials)}
            onMouseEnter={(e) => animateIcon(e, 1.5, 1.4)}
            onMouseLeave={(e) => animateIcon(e, 1, 1)}
            onFocus={(e) => animateIcon(e, 1.15, 1.4)}
            onBlur={(e) => animateIcon(e, 1, 0.75)}
          >
            <contactItem.icon className="nav-icon h-5.25 w-5.25 cursor-pointer " />
          </button>

          <div
            ref={socialRef}
            aria-label="Social links"
            className="invisible pointer-events-none absolute bottom-full left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 pb-2"
          >
            {socialItems.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                tabIndex={open ? 0 : -1}
                className={`${surface} social-link grid h-8.25 w-8.25 shrink-0 place-items-center rounded-xl`}
                onMouseEnter={(e) => animateIcon(e, 1.12, 1.4)}
                onMouseLeave={(e) => animateIcon(e, 1, 1)}
              >
                <Icon className="nav-icon h-3.75 w-3.75" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
