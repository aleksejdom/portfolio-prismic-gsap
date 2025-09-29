"use client";

import React, { useEffect, useRef, useCallback } from "react";
import styles from "./CustomCursor.module.css";

type CursorState = {
  delay: number;
  x: number;
  y: number;
  endX: number;
  endY: number;
  visible: boolean;
  enlarged: boolean;
};

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  // State als Ref (keine Re-Renders nötig)
  const cursorRef = useRef<CursorState>({
    delay: 8,
    x: 0,
    y: 0,
    endX: 0, // wird im Browser gesetzt
    endY: 0, // wird im Browser gesetzt
    visible: true,
    enlarged: false,
  });

  const toggleCursorSize = useCallback(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    const cursor = cursorRef.current;
    if (!dot || !outline) return;

    if (cursor.enlarged) {
      dot.style.transform = "translate(-50%, -50%) scale(1.3)";
      outline.style.transform = "translate(-50%, -50%) scale(2.0)";
      dot.style.mixBlendMode = "difference";
      outline.style.mixBlendMode = "difference";
      outline.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    } else {
      dot.style.transform = "translate(-50%, -50%) scale(1)";
      outline.style.transform = "translate(-50%, -50%) scale(1)";
      dot.style.mixBlendMode = "normal";
      outline.style.mixBlendMode = "normal";
      outline.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    }
  }, []);

  const toggleCursorVisibility = useCallback(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    const cursor = cursorRef.current;
    if (!dot || !outline) return;

    const opacity = cursor.visible ? "1" : "0";
    dot.style.opacity = opacity;
    outline.style.opacity = opacity;
  }, []);

  useEffect(() => {
    // Nur im Browser
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const cursor = cursorRef.current;
    const dot = dotRef.current!;
    const outline = outlineRef.current!;
    if (!dot || !outline) return;

    // Startposition in der Bildschirmmitte
    cursor.endX = window.innerWidth / 2;
    cursor.endY = window.innerHeight / 2;

    // Handlers (benannte Funktionen, damit wir sie wieder entfernen können)
    const handleParagraphOver = () => {
      cursor.enlarged = true;
      toggleCursorSize();
    };
    const handleParagraphOut = () => {
      cursor.enlarged = false;
      toggleCursorSize();
    };
    const handleMouseMove = (e: MouseEvent) => {
      cursor.visible = true;
      toggleCursorVisibility();

      cursor.endX = e.pageX;
      cursor.endY = e.pageY;

      dot.style.top = `${cursor.endY}px`;
      dot.style.left = `${cursor.endX}px`;
    };
    const handleMouseEnter = () => {
      cursor.visible = true;
      toggleCursorVisibility();
    };
    const handleMouseLeave = () => {
      cursor.visible = false;
      toggleCursorVisibility();
    };

    // Listener auf <p>-Elemente
    const paragraphNodes = Array.from(document.querySelectorAll("p"));
    paragraphNodes.forEach((el) => {
      el.addEventListener("mouseover", handleParagraphOver);
      el.addEventListener("mouseout", handleParagraphOut);
    });

    // Globale Maus-Listener
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animationsloop
    let rafId = 0;
    const animate = () => {
      cursor.x += (cursor.endX - cursor.x) / cursor.delay;
      cursor.y += (cursor.endY - cursor.y) / cursor.delay;

      outline.style.top = `${cursor.y}px`;
      outline.style.left = `${cursor.x}px`;

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);

      paragraphNodes.forEach((el) => {
        el.removeEventListener("mouseover", handleParagraphOver);
        el.removeEventListener("mouseout", handleParagraphOut);
      });

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [toggleCursorSize, toggleCursorVisibility]);

  return (
    <>
      <div ref={outlineRef} className={styles.cursorDotOutline} />
      <div ref={dotRef} className={styles.cursorDot} />
    </>
  );
}
