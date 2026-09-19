"use client";
import { hobbiesIcons } from "@/constants";

export default function HobbiesBox() {
  return (
    <div className="relative w-full h-full min-h-45 overflow-hidden ">
      <div className="absolute right-[-15%] top-[35%] z-20 -translate-x-1/2">
        <div className="relative rounded-xl bg-neutral-200 px-4 py-2 text-[12px] leading-tight text-neutral-700">
          Things I do outside
          <br />
          of all these
          <div className="absolute -bottom-1.25 left-2.4 h-4 w-3 rotate-45 bg-neutral-200" />
        </div>
      </div>

      {hobbiesIcons.map((item) => (
        <img
          key={item.name}
          src={item.icon}
          alt={item.name}
          className={`absolute z-10 object-contain ${item.className}`}
        />
      ))}

      <img
        src="/dhruv.png"
        alt=""
        className="absolute -bottom-2.5 left-1/2 z-30 w-30 -translate-x-1/2 object-contain"
      />
    </div>
  );
}
