"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

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
    {
      src: "/img1.png",
      logo: "/logo/nike.png",
      name: "Nike",
      link: "https://www.nike.com/",
    },
    {
      src: "/img2.png",
      logo: "/logo/bershka.png",
      name: "Bershka",
      link: "https://www.bershka.com/",
    },
    {
      src: "/img3.png",
      logo: "/logo/yves-rocher.png",
      name: "Yves Rocher",
      link: "https://www.yves-rocher.fr/",
    },
    {
      src: "/img4.png",
      logo: "/logo/gucci.png",
      name: "Gucci",
      link: "https://www.gucci.com/",
    },
    {
      src: "/img5.png",
      logo: "/logo/chanel.png",
      name: "Chanel",
      link: "https://www.chanel.com/",
    },
    {
      src: "/img6.png",
      logo: "/logo/prada.png",
      name: "Prada",
      link: "https://www.prada.com/",
    },
    {
      src: "/img7.jpg",
      logo: "/logo/hermes.png",
      name: "Hermès",
      link: "https://www.hermes.com/",
    },
    {
      src: "/img8.png",
      logo: "/logo/versace.png",
      name: "Versace",
      link: "https://www.versace.com/",
    },
    {
      src: "/img9.jpg",
      logo: "/logo/lacoste.jpg",
      name: "Lacoste",
      link: "https://www.lacoste.com/",
    },
    {
      src: "/img10.jpg",
      logo: "/logo/zara.png",
      name: "Zara",
      link: "https://www.zara.com/",
    },
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
              <Link
                href={item.link}
                key={i}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-[30vw] h-[80vh] flex-shrink-0 rounded-2xl overflow-hidden bg-white"
              >
                <div className="relative cursor-pointer w-full h-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={800}
                    height={1200}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    <Image
                      src={item.logo}
                      alt={`${item.name} logo`}
                      width={100}
                      height={100}
                      className="object-contain z-10 scale-y-0 group-hover:scale-y-100 opacity-0 group-hover:opacity-100 transition-all duration-500 origin-center"
                    />
                  </div>
                </div>
              </Link>
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

      <div style={{ height: "635vh" }} />
    </>
  );
}
