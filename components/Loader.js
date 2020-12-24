import { useEffect, useRef } from "react";
import { nanoid } from "nanoid";

import styles from "../styles/loader.module.css";

const Loader = ({ width = 50 }) => {
  const idRef = useRef(nanoid());
  useEffect(() => {
    document.documentElement.style.setProperty(`--loader-width-${idRef.current}`, `${width}px`);
  }, []);

  return (
    <div
      className={styles["bounce-loader"]}
      style={{
        width: `var(--loader-width-${idRef.current})`,
        height: `var(--loader-width-${idRef.current})`,
      }}
    >
      {Array.from({ length: 3 }, (_, idx) => (
        <div
          key={idx}
          className={styles["bounce-loader__dot"]}
          style={{
            width: `calc(var(--loader-width-${idRef.current}) / 4)`,
            height: `calc(var(--loader-width-${idRef.current}) / 4)`,
          }}
        />
      ))}
    </div>
  );
};

export default Loader;
