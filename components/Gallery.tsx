"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const box = boxRef.current;
    const overlay = overlayRef.current;

    if (!container || !track || !box || !overlay) return;

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
          const totalWidth = 303;
          const boxStartWidth = 0;
          const progress = self.progress;
          const newWidth =
            boxStartWidth + progress * (totalWidth - boxStartWidth);
          box.style.width = `${newWidth}px`;
        },
      },
    });

    gsap.fromTo(
      overlay,
      { y: "0%" },
      { y: "100%", duration: 1.5, ease: "power2.inOut", delay: 0.2 }
    );
  }, []);

  const images = [
    "/img1.png",
    "/img1.png",
    "/img1.png",
    "/img1.png",
    "/img1.png",
    "/img1.png",
    "/img1.png",
    "/img1.png",
    "/img1.png",
    "/img1.png",
  ];

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-black z-[100]"
      />

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
            {images.map((src, i) => (
              <div
                key={i}
                className="w-[30vw] h-[80vh] flex-shrink-0 rounded-2xl overflow-hidden bg-white"
              >
                <Image
                  src={src}
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

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="relative w-[300px] h-[30px]">
          <div className="absolute top-1/2 left-0 w-full flex justify-between -translate-y-1/2">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="w-px h-6 bg-white opacity-80" />
            ))}
          </div>

          <div
            ref={boxRef}
            className="absolute top-1/2 left-0 -translate-y-1/2 w-[20px] h-[24px] border bg-black border-white"
          />
        </div>
      </div>

      <div style={{ height: "630vh" }} />
    </>
  );
}
