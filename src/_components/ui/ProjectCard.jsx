"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ProjectCard({ project }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);
  return (
    <Link href={project.href} className="group block w-full">
      <div className="flex aspect-[1.45/1.2] items-center justify-center overflow-hidden rounded-xl bg-[#f5f5f5]">
        <div className="w-[85%] overflow-hidden rounded-xl">
          <video
            preload="auto"
            ref={videoRef}
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            className="block aspect-18/11 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01] p-6"
          ></video>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between px-2">
        <h3 className="text-sm text-neutral-900 xl:text-md ">{project.name}</h3>
        <span className="text-xs text-neutral-500 ">{project.year}</span>
      </div>
    </Link>
  );
}
