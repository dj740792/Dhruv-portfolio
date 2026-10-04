"use client";

import { useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { projects } from "@/constants";

function TechItem({ tech }) {
  const iconRef = useRef(null);
  const labelRef = useRef(null);

  const handleMouseEnter = () => {
    const icon = iconRef.current;
    const label = labelRef.current;

    gsap.killTweensOf([icon, label]);

    gsap.to(icon, {
      scale: 1.08,
      duration: 0.2,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(label, {
      autoAlpha: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    const icon = iconRef.current;
    const label = labelRef.current;

    gsap.killTweensOf([icon, label]);

    gsap.to(icon, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(label, {
      autoAlpha: 0,
      y: 4,
      duration: 0.15,
      ease: "power2.inOut",
      overwrite: true,
    });
  };

  return (
    <div
      className="relative shrink-0"
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
    >
      <div
        ref={iconRef}
        className="flex h-7 w-7 items-center justify-center rounded-[10px] p-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
      >
        <img
          src={tech.icon}
          alt={tech.name}
          className="h-full w-full object-contain rounded-xs"
        />
      </div>

      <span
        ref={labelRef}
        className="pointer-events-none invisible absolute bottom-full z-50 mb-2 whitespace-nowrap rounded-md bg-neutral-800 px-2 py-1 text-[10px] font-medium text-white opacity-0"
        style={{
          y: 4,
        }}
      >
        {tech.name}
      </span>
    </div>
  );
}
function ProjectItem({ project }) {
  const imageRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(imageRef.current, {
      y: 4,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
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
      className="relative flex min-h-72 min-w-0 flex-1 flex-col overflow-visible rounded-xl border border-neutral-200 p-2 md:max-[1099px]:min-h-100 max-md:p-2.5"
    >
      <div className="relative flex min-h-0 flex-1 flex-col overflow-visible max-[600px]:flex-none">
        {/* Project preview */}
        <div
          className={`${project.background} relative min-h-0 flex-1 overflow-hidden rounded-xl border border-neutral-200 p-2 max-[600px]:h-52 max-[600px]:min-h-52 max-[600px]:flex-none max-[380px]:h-56 max-[380px]:min-h-56`}
        >
          <div className="absolute bottom-0 left-1/2 w-[78%] -translate-x-1/2 cursor-pointer overflow-hidden">
            <img
              ref={imageRef}
              src={project.image}
              alt={`${project.title} project preview`}
              className="block h-auto w-full transform-gpu"
            />
          </div>
        </div>

        {/* Project info */}
        <div className="min-w-0 px-1 pt-3">
          <h3 className="wrap-break-word text-lg font-semibold text-neutral-800 max-md:text-base">
            {project.title}
          </h3>

          <p className="mt-1 wrap-break-word text-pretty text-sm leading-5 text-neutral-500">
            {project.description}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 px-1 max-[600px]:mt-2 max-[380px]:flex-wrap">
        {/* Tech stack */}
        <div className="flex min-w-0 flex-wrap items-center justify-end gap-1 cursor-pointer max-[600px]:justify-start">
          {project.tech?.map((tech) => (
            <TechItem key={tech.name} tech={tech} />
          ))}
        </div>
        {/* Project links */}
        <div className="flex shrink-0 items-center gap-3 max-[380px]:gap-2">
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code on GitHub`}
            className="flex items-center justify-center"
          >
            <img
              src="/skillsIcons/github-icon.jpeg"
              className="h-6 w-6 rounded-md object-contain max-[380px]:h-5 max-[380px]:w-5"
              alt=""
            />
          </Link>

          <Link
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} view the project live`}
            className="flex items-center justify-center"
          >
            <img
              src="/skillsIcons/web-icon.png"
              className="h-5 w-5 object-contain max-[380px]:h-4 max-[380px]:w-4"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsCard() {
  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden p-4 max-[600px]:p-3.5 max-[380px]:p-3">
      <h2 className="z-10 mb-3 select-none text-xl font-light uppercase text-neutral-700 max-[600px]:mb-2 max-[600px]:text-lg">
        My Projects
      </h2>

      <div className="flex min-h-0 flex-1 flex-col gap-4 md:max-[1099px]:grid md:max-[1099px]:grid-cols-2">
        {projects.map((project) => (
          <ProjectItem key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
