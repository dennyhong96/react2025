import { useState, useContext, createContext } from "react";
import firebase from "./firebase";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, signinWithGithub, signout } = userAuthProvider();
  return (
    <authContext.Provider value={{ user, signinWithGithub, signout }}>
      {children}
    </authContext.Provider>
  );
};

export const userAuthProvider = () => {
  const [user, setUser] = useState(null);

  const signinWithGithub = async () => {
    const { user } = await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider());
    console.log({ user });
    setUser(user);
  };

  const signout = async () => {
    await firebase.auth().signOut();
    setUser(null);
  };

  return {
    user,
    signinWithGithub,
    signout,
  };
};

export const useAuth = () => {
  return useContext(authContext);
};
