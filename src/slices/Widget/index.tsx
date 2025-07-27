import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./Widget.module.css";

/**
 * Props for `Widget`.
 */
export type WidgetProps = SliceComponentProps<Content.WidgetSlice>;

/**
 * Component for "Widget" Slices.
 */
const Widget = ({ slice }: WidgetProps): JSX.Element => {
  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      dangerouslySetInnerHTML={{
        __html: slice.primary.code || "<p>No content provided</p>",
      }}
      className={styles.widgetBlock}
    />
  );
};

export default Widget;
