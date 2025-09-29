"use client";

import { useEffect, useRef } from "react";
import type { Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import styles from "./TextBox.module.css";
import Button from "@/components/Button";

export type TextBoxProps = SliceComponentProps<Content.TextBoxSlice>;

const TextBox = ({ slice }: TextBoxProps): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Sicheres Auslesen der Link-URL und des Link-Texts
  const linkUrl =
    slice.primary.link && "url" in slice.primary.link
      ? (slice.primary.link.url as string | undefined)
      : undefined;
  const linkText =
    slice.primary.link && "text" in slice.primary.link
      ? (slice.primary.link.text as string | undefined)
      : undefined;
  const hasValidLink = !!linkUrl && !!linkText;

  useEffect(() => {
    let killScrollTrigger: (() => void) | null = null;
    let resizeHandler: (() => void) | null = null;

    // Nur im Browser
    /* if (typeof window === "undefined") return; */

    (async () => {
      // ✅ GSAP & Plugin nur im Browser laden
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const wrapper = wrapperRef.current;
      const button = buttonRef.current;
      if (!wrapper) return;

      const scrollTriggerId = `textbox-${Math.random().toString(36).slice(2, 11)}`;

      const setupScrollTrigger = () => {
        const paragraphs = wrapper.querySelectorAll("p");

        const timeline = gsap.timeline({
          scrollTrigger: {
            id: scrollTriggerId,
            trigger: wrapper,
            start: "top 90%",
            end: "bottom 30%",
            scrub: true,
            markers: false,
          },
        });

        paragraphs.forEach((paragraph) => {
          const words =
            paragraph.textContent
              ?.split(" ")
              .map((word) => {
                const span = document.createElement("span");
                span.textContent = `${word} `;
                span.className = styles.word;
                return span;
              }) ?? [];

          paragraph.replaceChildren(...words);

          timeline.fromTo(
            words,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power4.out",
              stagger: 0.05,
            },
            "-=0.4"
          );
        });

        if (button) {
          timeline.fromTo(
            button,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power4.out" },
            "+=0.2"
          );
        }
      };

      setupScrollTrigger();

      resizeHandler = () => {
        const st = ScrollTrigger.getById(scrollTriggerId);
        st?.kill();
        setupScrollTrigger();
      };
      window.addEventListener("resize", resizeHandler);

      killScrollTrigger = () => {
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
      };
    })();

    return () => {
      killScrollTrigger?.();
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.text_box}
    >
      <div className={styles.wrapper} ref={wrapperRef}>
        <PrismicRichText
          field={slice.primary.content}
          components={{
            paragraph: ({ children }) => (
              <p className={styles.paragraph}>{children}</p>
            ),
          }}
        />

        {hasValidLink && (
          <Button buttonRef={buttonRef} href={linkUrl} text={linkText} />
        )}
      </div>
    </div>
  );
};

export default TextBox;
