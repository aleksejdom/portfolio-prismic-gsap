"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./Lebenslauf.module.css";

gsap.registerPlugin(ScrollTrigger);

export type LebenslaufProps = SliceComponentProps<Content.LebenslaufSlice>;

const Lebenslauf = ({ slice }: LebenslaufProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(`.${styles.item}`);

    gsap.fromTo(
      items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play reverse play reverse", // <- das ist der entscheidende Punkt!
          // markers: true, // <- optional zum Debuggen
        },
      }
    );
    

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.lebenslauf}
    >
      <div className={styles.layout}>
        <div className={styles.headline}>
          {slice.primary.label && <p>{slice.primary.label}</p>}
          {slice.primary.headline && <h3>{slice.primary.headline}</h3>}
        </div>

        <div className={styles.items}>
          {slice.primary.items.map((item, index) => (
            <div className={styles.item} key={`${item.titel}-${index}`}>
              {item.titel && <p className={styles.title}>{item.titel}</p>}
              {item.datum && <p className={styles.datum}>{item.datum}</p>}
              {item.beschreibung && <p className={styles.desc}>{item.beschreibung}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lebenslauf;
