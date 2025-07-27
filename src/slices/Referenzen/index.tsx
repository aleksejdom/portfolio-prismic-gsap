"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./Referenzen.module.css";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

gsap.registerPlugin(ScrollTrigger);

export type ReferenzenProps = SliceComponentProps<Content.ReferenzenSlice>;

const Referenzen = ({ slice }: ReferenzenProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const items = itemsRef.current;

    if (container && items) {
      const totalWidth = items.scrollWidth - container.offsetWidth;

      gsap.to(items, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.referenzen}>
      {slice.primary.headline && (
        <h3 className={styles.headline}>{slice.primary.headline}</h3>
      )}

      <div className={styles.items} ref={itemsRef}>
        {slice.primary.projekte.map((item, index) => {
          const link =
            item.link?.link_type === "Document" && item.link?.uid
              ? `/projects/${item.link.uid}`
              : item.link?.link_type === "Web" && item.link?.url
              ? item.link?.url
              : null;

          return (
            <a
              key={index}
              href={link || "#"}
              className={styles.item}
              target={item.link?.link_type === "Web" ? "_blank" : "_self"}
              rel={
                item.link?.link_type === "Web" ? "noopener noreferrer" : undefined
              }
            >
              <div className={styles.infobox}>
                <p className={styles.label}>Projekt</p>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.desc}>{item.beschreibung}</p>
                <span className={styles.cta}>Mehr erfahren</span>
              </div>
              {item.image && (
                <PrismicNextImage field={item.image} alt={item.image.alt || 'Bild'} className={styles.image} />
              )}
            </a>
          );
        })}
      </div>

      {slice.primary.cta && (
        <PrismicNextLink
          field={slice.primary.cta}
          className={styles.ctaWrapper}
        >
          Zu den Referenzen
        </PrismicNextLink>
      )}
    </div>
  );
};

export default Referenzen;
