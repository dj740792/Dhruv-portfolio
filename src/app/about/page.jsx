import Image from "next/image";
import { aboutPhotos } from "@/constants/about";
import Link from "next/link";
import { Kiwi_Maru } from "next/font/google";

const yujiMai = Kiwi_Maru({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function About() {
  return (
    <>
      <main className="mx-auto w-full max-w-200 px-6 pt-32 sm:px-10">
        <section>
          <Link
            href="/"
            className="max-w-150 text-sm leading-relaxed text-neutral-500 sm:text-base "
          >
            ⬅ Back{" "}
          </Link>

          <div className="mt-9 space-y-5 text-sm leading-relaxed text-neutral-500 sm:text-base">
            <p>
              Hi, I'm{" "}
              <span className="underline decoration-dotted underline-offset-4">
                Dhruv
              </span>
              . I spend a probably unhealthy amount of time staring at websites
              and thinking, “how did they make that?”
            </p>

            <p>
              That's pretty much how I got into this. I like design, but I also
              like figuring out how things actually work behind it. So I ended
              up somewhere in between the two — designing things, writing code,
              messing around with animations, and trying to make the final thing
              feel just right.
            </p>

            <p>
              Most of what I know has come from building things myself. I'll see
              something I like, try to recreate it, break it five times, and
              eventually understand why it works.
            </p>
          </div>
        </section>

        <section className="mt-20">
          <p className="max-w-150 text-sm leading-relaxed text-neutral-500 sm:text-base">
            Outside of all these , I'm probably somewhere out with friends or
            watching movies while having coffee or practicing my{" "}
            <span
              className="japanese-greeting-trigger underline decoration-dotted underline-offset-4 "
              tabIndex={0}
              aria-describedby="japanese-greeting-description"
            >
              japanese
              <span
                className={`${yujiMai.className} japanese-greeting`}
                aria-hidden="true"
              >
                こんにちは
              </span>
            </span>
          </p>

          <div className="relative mt-10 lg:mt-10 flex justify-center overflow-visible">
            <div className="flex items-center gap-4">
              {aboutPhotos.map((photo) => (
                <div
                  key={photo.src}
                  className="relative -ml-2 w-44 shrink-0 border-4 border-white bg-white p-2 shadow-md first:ml-0 sm:w-48"
                  style={{
                    transform: `rotate(${photo.rotation})`,
                  }}
                >
                  <div className="relative aspect-4/5 w-full overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 640px) 168px, 152px"
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            <Image
              src="/about.svg"
              alt=""
              width={150}
              height={80}
              className="absolute  z-10 hidden lg:block lg:-right-50 lg:-top-10"
            />
          </div>
        </section>

        <div className="mt-20 text-sm leading-relaxed text-neutral-500 sm:text-base">
          <p>
            Anyway, that's me for now. I'm still figuring things out, still
            building, and probably always will be.
          </p>
          <p>If you think we'd make a good fit, feel free to get in touch.</p>
        </div>
      </main>
    </>
  );
}
