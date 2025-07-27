import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./Skill.module.css";
import clsx from "clsx";
/**
 * Props for `Skills`.
 */
export type SkillsProps = SliceComponentProps<Content.SkillsSlice>;

/**
 * Component for "Skills" Slices.
 */
const Skills = ({ slice }: SkillsProps): JSX.Element => {

  

  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.skills}
    >
      <div className={styles.wrapper}> 
        <div className={styles.items}> 
          {slice.primary.skill.map((item) => (
            <div className={styles.item} key={item.name}>
              
              <div className={clsx(styles.circle, {
                [styles.red]: item.colors === "red", // Beispiel
                [styles.blue]: item.colors === "blue", // Beispiel
                [styles.green]: item.colors === "green", // Beispiel
                [styles.yellow]: item.colors === "yellow", // Beispiel
              })} > 
              </div>
              <p className={styles.label}>{item.label}</p>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
