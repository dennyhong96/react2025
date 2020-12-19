import { useState, useContext, useEffect, createContext } from "react";

import firebase from "./firebase";
import { createUser } from "./db";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, signinWithGithub, signout } = useAuthProvider();
  return (
    <authContext.Provider value={{ user, signinWithGithub, signout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};

export const useAuthProvider = () => {
  const [user, setUser] = useState(null);

  const forwardUser = (user) => ({
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  });

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = forwardUser(rawUser);
      createUser(user.uid, user); // Stores user into firestore
      setUser(user);
      return user;
    }
    setUser(null);
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
  };

  const signout = async () => {
    await firebase.auth().signOut();
    handleUser(null);
  };

  return {
    user,
    signinWithGithub,
    signout,
  };
};