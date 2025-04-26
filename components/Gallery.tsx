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
    { src: "/img1.png", logo: "/nike-logo.png", name: "Nike" },
    { src: "/img2.png", logo: "/bershka-logo.png", name: "Bershka" },
    { src: "/img3.png", logo: "/yvesrocher-logo.png", name: "Yves Rocher" },
    { src: "/img4.png", logo: "/gucci-logo.png", name: "Gucci" },
    { src: "/img5.png", logo: "/chanel-logo.png", name: "Chanel" },
    { src: "/img6.png", logo: "/prada-logo.png", name: "Prada" },
    { src: "/img7.png", logo: "/hermes-logo.png", name: "Hermès" },
    { src: "/img8.png", logo: "/versace-logo.png", name: "Versace" },
    { src: "/img9.png", logo: "/lacoste-logo.png", name: "Lacoste" },
    { src: "/img10.png", logo: "/zara-logo.png", name: "Zara" },
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
            {images.map((item, i) => (
              <div
                key={i}
                className="group relative w-[30vw] h-[80vh] flex-shrink-0 rounded-2xl overflow-hidden bg-white"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={800}
                    height={1200}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay noir + logo */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    <Image
                      src={item.logo}
                      alt={`${item.name} logo`}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                </div>
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
