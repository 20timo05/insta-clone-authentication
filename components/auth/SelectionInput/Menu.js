import styles from "./style.module.css"

export default function Menu(props) {
  const { children, optionsOpen, customRef } = props;
  return (
    <section className={styles.select} ref={customRef}>
      {children}
      <i
        className={`fa-solid fa-chevron-down ${
          optionsOpen ? styles.optionsOpen : ""
        }`}
      ></i>
    </section>
  );
}
