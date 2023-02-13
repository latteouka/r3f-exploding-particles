import { css } from "@emotion/css";
import Github from "./Github";
import { TCanvas } from "./three/TCanvas";

export const App = () => {
  return (
    <div className={styles.container}>
      <TCanvas />
      <Github />
    </div>
  );
};

const styles = {
  container: css`
    position: relative;
    width: 100vw;
    height: 100vh;
  `,
};
