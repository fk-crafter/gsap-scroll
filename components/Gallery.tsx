"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const box = boxRef.current;

    if (!container || !track || !box) return;

    const totalScroll = track.scrollWidth - container.offsetWidth;

    gsap.to(track, {
      x: () => `-${totalScroll}`,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const totalWidth = 300; // en px, largeur totale de la "track" de ticks
          const boxWidth = 60; // largeur de la boîte de progression
          const progress = self.progress;
          const left = progress * (totalWidth - boxWidth);
          box.style.transform = `translateX(${left}px)`;
        },
      },
    });
  }, []);

  return (
    <>
      <main className="bg-black h-screen w-screen overflow-hidden text-white">
        <div
          ref={containerRef}
          className="relative h-screen w-screen overflow-hidden"
        >
          <div
            ref={trackRef}
            className="flex h-full items-center gap-10 px-8"
            style={{ width: "max-content" }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-[30vw] h-[80vh] flex-shrink-0 rounded-2xl overflow-hidden bg-white"
              >
                <Image
                  src="/img.avif"
                  alt={`img-${i}`}
                  width={800}
                  height={1200}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Barre de progression style "ticks" + box */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="relative w-[300px] h-[30px]">
          {/* Ticks */}
          <div className="absolute top-1/2 left-0 w-full flex justify-between -translate-y-1/2">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="w-px h-6 bg-white opacity-80" />
            ))}
          </div>

          {/* Boîte mobile */}
          <div
            ref={boxRef}
            className="absolute top-1/2 -translate-y-1/2 w-[60px] h-[24px] border border-white"
          />
        </div>
      </div>

      <div style={{ height: "630vh" }} />
    </>
  );
}
