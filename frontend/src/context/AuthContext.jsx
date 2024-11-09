import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const GoogleProvider = new GoogleAuthProvider();
//authProvider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //register user
  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  //login user
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  //sign up with google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Sign-in popup was closed by the user');
        return null;
      }
      throw error;
    }
  };

  //logout a user
  const logOutUser = async () => {
    return await signOut(auth);
  };

  //manage user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
         const userData = {email,username : displayName,photo : photoURL};
         return userData;
      }
    });

    return () => {unsubscribe();}
  },[]);

  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logOutUser
  };

  return (
    <AuthContext.Provider value={value} l>
      {children}
    </AuthContext.Provider>
  );
};
