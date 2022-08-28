import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDQp1U1MjpyKvjo4ANv2hPt-8UUXGUpRg",
  authDomain: "blog-8d207.firebaseapp.com",
  projectId: "blog-8d207",
  storageBucket: "blog-8d207.appspot.com",
  messagingSenderId: "750259015921",
  appId: "1:750259015921:web:3df6c8957ee4b97ab25950"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
