import React, { useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { auth } from "../config/firebase.config";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function githupSingIn() {
    const githupProvider = new GithubAuthProvider();
    return signInWithPopup(auth, githupProvider);
  }
  function googleSingIn() {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  }

  async function signup(email, password, name, file) {
    let fullpath = await file.name;
    let splitName = fullpath.split("\\");
    let fileName = splitName[splitName.length - 1];

    const storage = getStorage();
    const storageRef = ref(storage, "profilePictures/" + fileName);
    if (file) {
      await uploadBytes(storageRef, file)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((photoURL) => {
          return createUserWithEmailAndPassword(auth, email, password).then(
            (userCredential) => {
              if (!file && name) {
                return updateProfile(userCredential.user, {
                  displayName: name,
                });
              }
              if (!name && file) {
                return updateProfile(userCredential.user, {
                  photoURL: photoURL,
                });
              }
              return updateProfile(userCredential.user, {
                displayName: name,
                photoURL: photoURL,
              });
            }
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (name) {
          return updateProfile(userCredential.user, { displayName: name });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function emailUpdate(email) {
    return updateEmail(currentUser, email);
  }

  function passwordUpdate(password) {
    return updatePassword(currentUser, password);
  }

  async function profileUpdate(name, file) {
    let fullpath = await file.name;
    let splitName = fullpath.split("\\");
    let filename = splitName[splitName.length - 1];

    const storage = getStorage();
    const storageRef = ref(storage, "profilePictures/" + filename);
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((photoURL) => {
        if (!file && name) {
          return updateProfile(currentUser, { displayName: name });
        }
        if (!name && file) {
          return updateProfile(currentUser, { photoURL: photoURL });
        }
        return updateProfile(currentUser, {
          displayName: name,
          photoURL: photoURL,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    emailUpdate,
    passwordUpdate,
    githupSingIn,
    googleSingIn,
    profileUpdate,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
