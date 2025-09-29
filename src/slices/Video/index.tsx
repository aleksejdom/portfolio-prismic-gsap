"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./Video.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice>;

/**
 * Component for "Video" Slices.
 */
const Video = ({ slice }: VideoProps): JSX.Element => {
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | undefined>(undefined);

  useEffect(() => {
    if (videoBoxRef.current && videoRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "video-scroll-trigger",
          trigger: videoBoxRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        videoBoxRef.current,
        { scale: 0.7, opacity: 0.8, transformY: -250 },
        { scale: 1, opacity: 1, duration: 1.2, transformY: 0, ease: "power2.out" }
      ).fromTo(
        videoRef.current,
        { borderRadius: 45 },
        { borderRadius: 0, duration: 1.2, ease: "power2.out" },
        "<" // Startet gleichzeitig mit der vorherigen Animation
      );

      scrollTriggerRef.current = tl.scrollTrigger;

      return () => {
        scrollTriggerRef.current?.kill();
      };
    }
  }, []);

  return (
    <section
      ref={videoBoxRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.videoBox}
    >
      <video controls poster={slice.primary.poster?.url || ""} ref={videoRef}>
        {slice.primary.m4v && <source src={slice.primary.m4v} type="video/mp4" />}
        {slice.primary.webm && <source src={slice.primary.webm} type="video/webm" />}
        Ihr Browser unterstützt das Video-Tag nicht.
      </video>
    </section>
  );
};

export default Video;
