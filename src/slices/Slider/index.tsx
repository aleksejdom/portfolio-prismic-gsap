"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./Slider.module.css";
import { useRef, useEffect } from "react";

/**
 * Props for `Slider`.
 */
export type SliderProps = SliceComponentProps<Content.SliderSlice>;

/**
 * Component for "Slider" Slices.
 */
const Slider = ({ slice }: SliderProps): JSX.Element => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const initSwiperNavigation = () => {
      if (swiperRef.current && prevRef.current && nextRef.current) {
        swiperRef.current.params.navigation.prevEl = prevRef.current;
        swiperRef.current.params.navigation.nextEl = nextRef.current;
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
      }
    };

    initSwiperNavigation();
  }, []);

  return (
    <div className={styles.slider_container}>
      <Swiper
        modules={[Navigation]}
        loop={true}
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={6}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          640: { slidesPerView: 1.2, spaceBetween: 20 },
          1024: { slidesPerView: 2.5, spaceBetween: 30 },
        }}
      >
        {slice.primary.images.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={styles.slide}>
              <PrismicNextImage
                field={item.image}
                className={styles.image}
                alt={item.alt || "Slide image"}
                width={500}
                height={300}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.navigation}>
        <div ref={prevRef} className={`${styles.prev} swiper-button-prev`}> 
        </div>
        <div ref={nextRef} className={`${styles.next} swiper-button-next`}> 
        </div>
      </div>
    </div>
  );
};

export default Slider;
