

"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import {
  FaHouse,
  FaUser,
  FaFolder,
  FaPaperPlane,
  FaRegFileLines,
  FaGithub,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

const navigation = [
  { label: "Home", href: "/", icon: FaHouse },
  { label: "About", href: "/about", icon: FaUser },
  { label: "UI Gallery", href: "/gallery", icon: FaFolder },
];

const socials = [
  { label: "GitHub", href: "https://github.com/dj740792", icon: FaGithub },
  { label: "X", href: "https://x.com/dhrxvui", icon: FaXTwitter },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dhruv-jha-7a1a4441b/",
    icon: FaLinkedinIn,
  },
];

export default function Navbar() {
  const socialRef = useRef(null);
  const socialTween = useRef(null);

  const showSocials = () => {
    const element = socialRef.current;
    if (!element) return;

    socialTween.current?.kill();

    socialTween.current = gsap.to(element, {
      autoAlpha: 1,
      y: 0,
      duration: 0.22,
      ease: "power2.out",
      pointerEvents: "auto",
    });
  };

  const hideSocials = () => {
    const element = socialRef.current;
    if (!element) return;

    socialTween.current?.kill();

    socialTween.current = gsap.to(element, {
      autoAlpha: 0,
      y: 8,
      duration: 0.18,
      ease: "power2.in",
      pointerEvents: "none",
    });
  };

  const surface =
    "border border-white/[0.09] bg-[#202020] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-2px_3px_rgba(0,0,0,0.28),0_8px_24px_rgba(0,0,0,0.12),0_2px_5px_rgba(0,0,0,0.08)]";

  const navItem =
    "group relative grid h-12 w-14 shrink-0 place-items-center rounded-[14px] text-white/50 transition-[color,background-color,transform] duration-200 ease-out hover:-translate-y-px hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 active:scale-95";

  const iconStyle =
    "h-[23px] w-[23px] transition-transform duration-200 ease-out group-hover:scale-110";

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-[max(28px,env(safe-area-inset-bottom))] left-1/2 z-[1000] flex -translate-x-1/2 items-center gap-[14px] font-mono"
    >
      <div
        className={`${surface} flex h-[66px] w-[414px] items-center justify-between rounded-[21px] px-3`}
      >
        {navigation.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            className={navItem}
          >
            <Icon aria-hidden="true" className={iconStyle} />
            <span className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg border border-white/10 bg-[#242424] px-2 py-1.5 text-[11px] font-medium text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              {label}
            </span>
          </Link>
        ))}

        <div
          className="relative flex h-full items-center"
          onMouseEnter={showSocials}
          onMouseLeave={hideSocials}
          onFocus={showSocials}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              hideSocials();
            }
          }}
        >
          <button
            type="button"
            aria-label="Contact and social links"
            className={`${navItem} group`}
            onClick={() => {
              if (socialRef.current?.style.visibility === "visible") {
                hideSocials();
              } else {
                showSocials();
              }
            }}
          >
            <FaPaperPlane
              aria-hidden="true"
              className={`${iconStyle} -rotate-[7deg] group-hover:rotate-0`}
            />
            <span className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg border border-white/10 bg-[#242424] px-2 py-1.5 text-[11px] font-medium text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              Connect
            </span>
          </button>

          <div
            ref={socialRef}
            className="invisible pointer-events-none absolute bottom-[calc(100%+7px)] left-1/2 flex -translate-x-1/2 items-center gap-[7px] pb-[7px] opacity-0"
            style={{ visibility: "hidden" }}
          >
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-[35px] w-[35px] shrink-0 place-items-center rounded-full border border-white/10 bg-[#202020] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_12px_rgba(0,0,0,0.12)] transition-[background-color,transform] duration-200 hover:-translate-y-[3px] hover:bg-[#353535] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
              </a>
            ))}
            <span className="absolute bottom-0 left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#202020]" />
          </div>
        </div>
      </div>

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open resume PDF in a new tab"
        className={`${surface} group relative grid h-[66px] w-[66px] shrink-0 place-items-center rounded-[20px] transition-transform duration-200 ease-out hover:bg-[#292929] active:scale-95`}
      >
        <FaRegFileLines
          aria-hidden="true"
          className="h-[25px] w-[25px] rotate-[9deg] transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:rotate-0"
        />
        <span className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-lg border border-white/10 bg-[#242424] px-2 py-1.5 text-[11px] font-medium text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          Resume
        </span>
      </a>
    </nav>
  );
}
