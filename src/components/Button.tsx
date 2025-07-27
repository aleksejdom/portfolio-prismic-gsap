import { forwardRef } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  buttonRef?: React.Ref<HTMLAnchorElement>;
  href: string;
  text: string;
};

const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ buttonRef, href, text }, ref) => {
    return (
      <a ref={ref || buttonRef} href={href} className={styles.btn}>
        {/* SVG passt sich an die Breite und Höhe des A-Tags an */} 
        <span>{text}</span>
      </a>
    );
  }
);

Button.displayName = "Button";

export default Button;
