"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./Hero.module.css";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <div className={styles.hero}>
      <div className={styles.hero_wrapper}>
        <div className={styles.details}>
          {slice.primary.button.map((item) => (
            <div className={styles.link} key={item.label}>
              <p className={styles.label}>{item.label}</p>
              <p>{item.link_name}</p>
            </div>
          ))}
        </div>
        <PrismicNextImage field={slice.primary.image} />
      </div>
    </div>
  );
};

export default Hero;
