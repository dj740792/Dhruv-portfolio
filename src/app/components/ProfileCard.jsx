"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";

const GitHubCalendar = dynamic(
  () =>
    import("react-github-calendar").then(
      ({ GitHubCalendar: Calendar }) => Calendar,
    ),
  { ssr: false },
);

export default function ProfileCard() {
  const [activeImage, setActiveImage] = useState(null);
  const calendarWrapperRef = useRef(null);

  const coverSrc = "/cover.png";
  const avatarSrc = "/profile.jpg";

  useEffect(() => {
    const wrapper = calendarWrapperRef.current;
    if (!wrapper) return undefined;

    let attempts = 0;
    const scrollToRecentMonths = () => {
      const scrollContainer = wrapper.querySelector(
        ".react-activity-calendar__scroll-container",
      );

      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth;
      }

      attempts += 1;
      if (attempts >= 20) {
        window.clearInterval(intervalId);
      }
    };

    const intervalId = window.setInterval(scrollToRecentMonths, 100);
    scrollToRecentMonths();

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="profile-content">
        <div
          className="profile-cover cursor-pointer"
          aria-label="portfolio cover photo"
          onClick={() => setActiveImage(coverSrc)}
        >
          <Image
            src={coverSrc}
            fill
            alt="cover photo"
            className="cover-img"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
          />
        </div>

        <div
          className="avatar cursor-pointer"
          aria-label="Dhruv Jha portrait"
          onClick={() => setActiveImage(avatarSrc)}
        >
          <Image
            src={avatarSrc}
            alt="Dhruv Jha"
            fill
            className="profile-img"
            sizes="(max-width: 768px) 120px, 140px"
          />
        </div>
        <div className="space-y-8">
          <div className="profile-heading">
            <div>
              <h1>Dhruv Jha</h1>
              <p>21, New Delhi</p>
              <p>Creative Web Developer</p>
            </div>
          </div>

          <div className="profile-intro">
            <h2>What I do?</h2>
            <p>
              I Turn visual concepts into smooth, production-grade web
              applications. I focus on clean interfaces, thoughtful user
              interactions, and solid code that brings ideas to life.
            </p>
          </div>

          <div
            ref={calendarWrapperRef}
            className="calendar-wrapper no-scrollbar"
          >
            <GitHubCalendar
              username="dj740792"
              blockSize={10}
              blockMargin={4}
              fontSize={10}
              transformData={(data) =>
                data.filter((day) => {
                  const date = new Date(day.date);
                  return date.getMonth() >= 5;
                })
              }
              labels={{
                totalCount: "{{count}} contributions since June",
              }}
              theme={{
                light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
              colorScheme="light"
            />
          </div>
        </div>

        <div className="social-links" aria-label="Social links">
          <Link
            href="https://x.com/dhrxvui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <FaXTwitter />
          </Link>
          <Link
            href="https://github.com/dj740792"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </Link>
          <Link
            href="https://www.linkedin.com/in/dhruv-jha-7a1a4441b/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-pointer"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative h-[80vh] w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage}
              alt="Enlarged view"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>
      )}
    </>
  );
}
