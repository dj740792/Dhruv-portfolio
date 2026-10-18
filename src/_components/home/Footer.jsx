"use client";

import Link from "next/link";
import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { socials } from "@/constants/socials";

const email = "dhrxvui@gmail.com"

export default function Footer() {
    const [copied, setCopied ] = useState(false)

    const copyEmail = async()=>{
        await navigator.clipboard.writeText(email);

        setCopied(true)

        setTimeout(()=>{
            setCopied(false);
        },1800)
    }
  return (
   <footer className="mx-auto w-full max-w-200 px-6 pb-8 pt-20 sm:px-10">
      <div className="flex flex-col gap-10 border-t border-dotted border-neutral-300 pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
            Let's work together
          </h2>

          <button
            type="button"
            onClick={copyEmail}
            className="mt-4 inline-flex items-center gap-5 rounded-lg bg-neutral-100 px-3 py-2 text-sm text-neutral-600 transition-all duration-200 cursor-pointer "
          >
            {email}
            <FiCopy />
          </button>
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

      <div
        className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
          copied
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 rounded-xl border border-neutral-200  px-4 py-2.5 text-sm text-neutral-700 shadow-lg">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-700 text-white">
            <FiCheck size={12} className="" />
          </span>

          <span>copied</span>
        </div>
      </div>
    </footer>
  )
}
