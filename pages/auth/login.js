import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { useRouter } from "next/router";
import styles from "./auth.module.css";
import Alert from "../../components/Modal/Alert";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";


const Login = () => {
  //Alert
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const onchange = (e) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const Newuser = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    )
      .then(() => {
        setIsLoading(false);
        router.push("/create-post");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setError(true);
          setIsLoading(false);
          setMessage("Please Enter Valid Information");
        } else if (error.code === "auth/invalid-email") {
          setMessage("That email address is invalid!");
          setError(true);
          setIsLoading(false);
        } else if (error.code === "auth/wrong-password") {
          setMessage("Please Enter Valid Credentials");
          setError(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          alert(error.code);
        }
      });
  };
  return (
    <>
      <div style={{ height: "100vh" }}>
        <div className={styles.formContainer}>
        <h1 className="fw-bold">Login</h1>
          <form className="">
            <div style={{ marginBottom: "1.5rem" }}>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="email" className={styles.Label}>
                Enter your email
              </label>
              <input
                onChange={onchange}
                type="email"
                id="email"
                name="email"
                className={styles.inp}
                placeholder="name@example.com"
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="password" className={styles.Label}>
                Enter password
              </label>
              <input
                name="password"
                onChange={onchange}
                placeholder="Password"
                type="password"
                id="password"
                className={styles.inp}
              />
            </div>

            <button
              disabled={isLoading}
              onClick={handleLogin}
              type="submit"
              className={styles.btn}
            >
              {isLoading ? <LoadingSpinner /> : "Login"}
            </button>

          </form>
        </div>
      </div>
      {error && <Alert message={message} setError={setError} />}
    </>
  );
};

export default Login;
