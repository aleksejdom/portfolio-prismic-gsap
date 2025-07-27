import { Content } from "@prismicio/client"; 
import { SliceComponentProps } from "@prismicio/react";
import styles from "./Tools.module.css";

/**
 * Props for `Tools`.
 */
export type ToolsProps = SliceComponentProps<Content.ToolsSlice>;

/**
 * Component for "Tools" Slices.
 */
const Tools = ({ slice }: ToolsProps): JSX.Element => {
  // Anzahl der Items berechnen
  const itemCount = slice.primary.toolset.length;

  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.tools_block}
    >
      <div className={styles.wrapper}>
        <h3>{slice.primary.headline}</h3>
        <div className={`${styles.items} ${styles[`items-${itemCount}`]}`}>
          {slice.primary.toolset.map((item, index) => (
            <div key={index} className={styles.item}>
              {item.tool}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
