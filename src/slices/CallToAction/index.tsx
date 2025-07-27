import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import phone from "../../../public/phone-icon.svg";
import mail from "../../../public/mail-icon.svg";
import styles from "./CallToAction.module.css";
import Spline from '@splinetool/react-spline/next';

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.callToActionBlock}
    >
      <Spline
        scene="https://prod.spline.design/IrSa6tWhLWR2QjYw/scene.splinecode" 
      />
      <div className={styles.content}> 
        <p className={styles.headline}>{slice.primary.headline}</p> 
        {slice.primary.links && (
          <div className={styles.items}>
            {slice.primary.links.map((item, index) => {  
              return (
                <div key={index} className={styles.item}>
                  {/* Button mit Icon und Prismic Link */}
                  <PrismicNextLink field={item.link} className={styles.btn}>
                    {/* Icon basierend auf dem Typ */}
                    {item.typ === "phone" ? (
                      <Image src={phone} alt="Phone icon" width={20} height={20} />
                    ) : (
                      <Image src={mail} alt="Mail icon" width={20} height={20} />
                    )}

                    {/* Button-Text */}
                    <span>{item.link.text || "Button"}</span>

                    {/* SVG für Hover-Effekt */}
                    <svg
                      width="180px"
                      height="60px"
                      viewBox="0 0 180 60"
                      className={styles.border}
                    >
                      <polyline
                        points="179,1 179,59 1,59 1,1 179,1"
                        className={styles.bgLine}
                      />
                      <polyline
                        points="179,1 179,59 1,59 1,1 179,1"
                        className={styles.hlLine}
                      />
                    </svg>
                  </PrismicNextLink>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CallToAction;
