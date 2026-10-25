"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { FiCheck, FiCopy } from "react-icons/fi";
import { socials } from "@/constants/socials";

const email = "dhrxvui@gmail.com";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const iconRef = useRef(null);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);

    setCopied(true);

    gsap.fromTo(
      iconRef.current,
      {
        scale: 0.7,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.9,
        ease: "back.out(1.5)",
      }
    );

    setTimeout(() => {
      setCopied(false);
    }, 2200);
  };

  return (
    <footer id="footer" className="mx-auto w-full max-w-200 px-6 pb-8 pt-20 sm:px-10">
      <div className="flex flex-col gap-10 border-t border-dotted border-neutral-300 pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
            Wanna hire me?
          </h2>

          <div className="relative mt-4 inline-block">
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex cursor-pointer items-center gap-5 rounded-lg bg-neutral-100 px-3 py-2 text-sm text-neutral-600"
            >
              {email}

              <span ref={iconRef}>
                {copied ? (
                  <FiCheck className="text-green-500" />
                ) : (
                  <FiCopy />
                )}
              </span>
            </button>

            <div
              className={`absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-600 shadow-sm transition-all duration-300 ${
                copied
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-1 opacity-0"
              }`}
            >
              Copied
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {socials.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="text-neutral-500 transition-all duration-200 hover:text-neutral-900"
            >
              <Icon size={20} />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-center justify-between text-xs text-neutral-400">
        <span>© 2026 Dhruv Jha</span>
      </div>
    </footer>
  );
}