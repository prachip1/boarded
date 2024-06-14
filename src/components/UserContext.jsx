import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        sessionStorage.setItem("userId", authUser.uid);
      } else {
        setUser(null);
        sessionStorage.removeItem("userId");
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/workspace');
     
    } catch (error) {
      setError(error.message);
    }
  };

  const register = async (username, email, password) => {
    if (!username || !email || !password) {
      throw new Error("All fields must be filled");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      setUser(userCredential.user);
      navigate('/workspace');
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/signin');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <UserContext.Provider value={{ user, error, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};
