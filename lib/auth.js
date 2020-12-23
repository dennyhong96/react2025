import { useState, useContext, useEffect, createContext } from "react";
import cookies from "js-cookie";
import { useRouter } from "next/router";

import firebase from "./firebase";
import { createUser } from "./db";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, signinWithGithub, signinWithGoogle, signout } = useAuthProvider();
  return (
    <authContext.Provider value={{ user, signinWithGithub, signinWithGoogle, signout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};

export const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const formatUser = (user) => ({
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  });

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const token = await rawUser.getIdToken(); // Gets JWT
      const stripeRole = (await rawUser.getIdTokenResult())?.claims?.stripeRole; // Gets Stripe Custom Claim
      const user = formatUser(rawUser); // Filter out unused raw user data
      createUser(user.uid, user); // Upserts user into firestore
      setUser({ token, stripeRole, ...user }); // Stores user into state
      cookies.set("AUTHENTICATED", JSON.stringify(true), { expires: 1 }); // Stores cookie for redirect
      return user;
    }
    setUser(null);
    cookies.remove("AUTHENTICATED");
    return null;
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      handleUser(user);
    });
    return unsubscribe;
  }, []);

  const signinWithGithub = async () => {
    const { user } = await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());
    handleUser(user);
    router.push("/dashboard");
  };

  const signinWithGoogle = async () => {
    const { user } = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    handleUser(user);
    router.push("/dashboard");
  };

  const signout = async () => {
    await firebase.auth().signOut();
    handleUser(null);
    router.push("/");
  };

  return {
    user,
    signinWithGithub,
    signinWithGoogle,
    signout,
  };
};
