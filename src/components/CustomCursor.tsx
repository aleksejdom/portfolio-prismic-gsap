"use client";

import React, { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  const cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: window.innerWidth / 2,
    endY: window.innerHeight / 2,
    cursorVisible: true,
    cursorEnlarged: false,

    setupEventListeners() {
      const dot = dotRef.current!;
      const outline = outlineRef.current!;

      // Anchor hover
      document.querySelectorAll("p").forEach((el) => {
        el.addEventListener("mouseover", () => {
          this.cursorEnlarged = true;
          this.toggleCursorSize(dot, outline);
        });
        el.addEventListener("mouseout", () => {
          this.cursorEnlarged = false;
          this.toggleCursorSize(dot, outline);
        });
      });

      // Mouse events
      document.addEventListener("mousemove", (e) => {
        this.cursorVisible = true;
        this.toggleCursorVisibility(dot, outline);

        this.endX = e.pageX;
        this.endY = e.pageY;

        dot.style.top = `${this.endY}px`;
        dot.style.left = `${this.endX}px`;
      });

      document.addEventListener("mouseenter", () => {
        this.cursorVisible = true;
        this.toggleCursorVisibility(dot, outline);
      });

      document.addEventListener("mouseleave", () => {
        this.cursorVisible = false;
        this.toggleCursorVisibility(dot, outline);
      });
    },

    animateDotOutline(dot: HTMLElement, outline: HTMLElement) {
      this._x += (this.endX - this._x) / this.delay;
      this._y += (this.endY - this._y) / this.delay;

      outline.style.top = `${this._y}px`;
      outline.style.left = `${this._x}px`;

      requestAnimationFrame(() => this.animateDotOutline(dot, outline));
    },

    toggleCursorSize(dot: HTMLElement, outline: HTMLElement) {
      if (this.cursorEnlarged) {
        dot.style.transform = "translate(-50%, -50%) scale(1.3)"; // Größerer Dot
        outline.style.transform = "translate(-50%, -50%) scale(2.0)"; // Größerer Outline
        dot.style.mixBlendMode = "difference"; // Aktiviert den Effekt
        outline.style.mixBlendMode = "difference"; // Aktiviert den Effekt
        outline.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; // Optional, für mehr Kontrast
      } else {
        dot.style.transform = "translate(-50%, -50%) scale(1)";
        outline.style.transform = "translate(-50%, -50%) scale(1)";
        dot.style.mixBlendMode = "normal"; // Setzt den Effekt zurück
        outline.style.mixBlendMode = "normal"; // Setzt den Effekt zurück
        outline.style.backgroundColor = "rgba(255, 255, 255, 0.5)"; // Standard-Hintergrund
      }
    },

    toggleCursorVisibility(dot: HTMLElement, outline: HTMLElement) {
      if (this.cursorVisible) {
        dot.style.opacity = "1";
        outline.style.opacity = "1";
      } else {
        dot.style.opacity = "0";
        outline.style.opacity = "0";
      }
    },
  };

  useEffect(() => {
    const dot = dotRef.current!;
    const outline = outlineRef.current!;

    cursor.setupEventListeners();
    cursor.animateDotOutline(dot, outline);
  }, []);

  return (
    <>
      <div ref={outlineRef} className={styles.cursorDotOutline}></div>
      <div ref={dotRef} className={styles.cursorDot}></div>
    </>
  );
}
