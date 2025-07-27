"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./TextBox.module.css";
import Button from "@/components/Button";

gsap.registerPlugin(ScrollTrigger);

export type TextBoxProps = SliceComponentProps<Content.TextBoxSlice>;

const TextBox = ({ slice }: TextBoxProps): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const linkUrl = slice.primary.link?.url;
  const linkText = slice.primary.link?.text;
  const hasValidLink = !!linkUrl && !!linkText;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const button = buttonRef.current;
    if (!wrapper) return;

    const scrollTriggerId = `textbox-${Math.random().toString(36).substr(2, 9)}`;

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
        const words = paragraph.textContent
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

      // ✅ Optional: Button animieren, nur wenn vorhanden
      if (button) {
        timeline.fromTo(
          button,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power4.out",
          },
          "+=0.2"
        );
      }
    };

    setupScrollTrigger();

    const resizeHandler = () => {
      ScrollTrigger.getById(scrollTriggerId)?.kill();
      setupScrollTrigger();
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      ScrollTrigger.getById(scrollTriggerId)?.kill();
      window.removeEventListener("resize", resizeHandler);
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
            paragraph: ({ children }) => <p className={styles.paragraph}>{children}</p>,
          }}
        />

        {hasValidLink && (
          <Button
            buttonRef={buttonRef}
            href={linkUrl}
            text={linkText}
          />
        )}
      </div>
    </div>
  );
};

export default TextBox;
