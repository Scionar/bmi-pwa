import styles from "./AppContainer.module.css";

type AppContainerProps = {
    children?: React.ReactNode;
};

const AppContainer = ({ children }: AppContainerProps) => (
  <div className={styles.AppContainer}>
    {children}
  </div>
);

export default AppContainer;
