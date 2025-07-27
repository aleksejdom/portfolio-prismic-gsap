
"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy(); // Clean up resources
  }, []);

  return <>{children}</>; // Render child components without hydration dependencies
}
