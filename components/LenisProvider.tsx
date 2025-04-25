"use client";

import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";

export default function LenisProvider() {
  useGSAP(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return null;
}
