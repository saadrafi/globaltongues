import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import FullPageSpinner from "../spinners/FullPageSpinner";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUser = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
      if (user) {
        fetch("http://localhost:3000/jwt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user?.email }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            localStorage.setItem("access-token", data.token);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authInfo = {
    user,
    loading,
    signUp,
    updateUser,
    setLoading,
    signIn,
    signInWithGoogle,
    logOut,
  };
  return loading ? (
    <FullPageSpinner></FullPageSpinner>
  ) : (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
