import React, { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import styles from "./auth.module.css";
import { useRouter } from "next/router";
import Alert from "../../components/Modal/Alert";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import Link from "next/link";
const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const onchange = (e) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const Newuser = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    )
      .then((userCred) => {
        updateName(userCred)
        setIsLoading(false);
        router.push("/home");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setMessage("That email address is already in use!");
          setError(true)
        } else if (error.code === "auth/invalid-email") {
          setMessage("That email address is invalid!");
          setError(true)
        } else if (error.code === "auth/wrong-password") {
          setMessage("Please Enter Valid Credentials");
          setError(true)
        } else if (error.code === "auth/weak-password") {
          setMessage("Please Enter Valid Credentials");
          setError(true)
        } else {
          setError(true)
          setMessage(error.code);
        }
        setError(true);
        setIsLoading(false);
      });
  };

  
  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider)
    .then((result) => {
      router.push("/home");
    })
    .catch((err) => {
      console.log(err);
    });
  };
  const updateName = async (userCred)=>{
    await updateProfile(userCred.user, {
      displayName:user.username
    })
   
  }
  return (
    <>
      <div style={{ height: "100vh" }}>
        <div className={styles.formContainer}>
          <form className="">
          <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="username" className={styles.Label}>
                Enter your name
              </label>
              <input
                onChange={onchange}
                type="text"
                id="username"
                name="username"
                className={styles.inp}
                placeholder="John Doe"
              />
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
              onClick={handleSignup}
              type="submit"
              className={styles.btn}
            >
              {isLoading ? <LoadingSpinner /> : "Register"}
            </button>

            <div className={styles.signInGoogleButton}>
              
              <p className="mt-4">
                Already a user?{" "}
                <Link href="/auth/login" className={styles.link}>
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {error && <Alert message={message} setError={setError} />}
    </>
  );
};

export default Register;
