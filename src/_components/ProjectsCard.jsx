"use client";

import { useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { projects } from "@/constants";

function ProjectItem({ project }) {
  const previewRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(previewRef.current, {
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(imageRef.current, {
      y: 7,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(previewRef.current, {
      duration: 0.3,
      ease: "power2.inOut",
    });

    gsap.to(imageRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-0 flex-1 flex-col overflow-visible border rounded-xl border-neutral-200 p-2"
    >
      <div
        target={project.href.startsWith("http") ? "_blank" : undefined}
        rel={
          project.href.startsWith("http") ? "noopener noreferrer" : undefined
        }
        className="relative flex min-h-0 flex-1 flex-col overflow-visible"
      >
        <div
          ref={previewRef}
          className={`${project.background} relative min-h-0 flex-1 overflow-hidden rounded-xl border border-neutral-200 p-2 `}
        >
          {/* Project screenshot */}
          <div className="absolute bottom-0 left-1/2 w-[78%] -translate-x-1/2 overflow-hidden cursor-pointer">
            <img
              ref={imageRef}
              src={project.image}
              alt={`${project.title} project preview`}
              className="block h-auto w-full transform-gpu "
            />
          </div>
        </div>

        {/* PROJECT INFO */}
        <div className="px-1 pt-3">
          <h3 className="text-xl font-semibold text-neutral-800">
            {project.title}
          </h3>

          <p className="mt-1 text-sm leading-5 text-neutral-500">
            {project.description}
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-medium uppercase text-neutral-700">
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code on GitHub`}
          >
            <img src="/skillsIcons/github-icon.jpeg" className="h-7" alt="" />
          </Link>
          <Link
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} view the project live`}
          >
            <img src="/skillsIcons/web-icon.png" className="h-5" alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsCard() {
  return (
    <div className="relative flex h-full min-h-45 w-full flex-col overflow-hidden p-4">
      <h2 className="z-10 mb-3 select-none text-xl font-light uppercase text-neutral-700">
        My Projects
      </h2>

      <div className="flex min-h-0 flex-1 flex-col gap-4">
        {projects.map((project) => (
          <ProjectItem key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
