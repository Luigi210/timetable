import styles from "./Range.module.css";

export const Range: React.FC<{ from: string; to: string }> = ({ from, to }) => {
  return (
    <div className={styles.range}>
      <div className={`${styles.value} ${styles.left}`}>
        <span>{from}</span>
      </div>
      <div className={styles.until}>до</div>
      <div className={`${styles.value} ${styles.right}`}>
        <span>{to}</span>
      </div>
    </div>
  );
};
