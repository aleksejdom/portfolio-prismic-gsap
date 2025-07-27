import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import SplineNext from "@splinetool/react-spline/next";

/**
 * Props for `Spline`.
 */
export type SplineProps = SliceComponentProps<Content.SplineSlice>;

/**
 * Component for "Spline" Slices.
 */
const Spline = ({ slice }: SplineProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      
      {slice.primary.spline_code ? (
        <SplineNext scene={slice.primary.spline_code} />
      ) : (
        <p>Keine gültige Spline-Szene verfügbar.</p>
      )}
    </section>
  );
};

export default Spline;
