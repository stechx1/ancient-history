import React from "react";
import styles from "./Modal.module.css";
import buttonStyles from "../../pages/auth/auth.module.css";

const Alert = ({ message, setError }) => {
  return (
    <>
      <div className={styles.alertModalContainer}>
        <div className={styles.alertModal}>
          <h1>Warning</h1>
          <p>{message}</p>
          <button
            onClick={() => {
              setError(false);
            }}
            className={buttonStyles.btn}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Alert;
