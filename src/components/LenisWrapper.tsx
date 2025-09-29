"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return; // <-- Nur im Browser ausführen!

    let lenis: any;

    (async () => {
      const { default: Lenis } = await import("lenis"); // lazy import
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      const raf = (t: number) => {
        lenis.raf(t);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    })();

    return () => {
      lenis?.destroy?.();
    };
  }, []);

  return null;
}
