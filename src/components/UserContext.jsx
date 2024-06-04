import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LoaderPage from './LoaderPage';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);  // Start with loading true
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/workspace');
   
    
  };

  const register = async (username, email, password) => {
    if (!username || !email || !password) {
      throw new Error("All fields must be filled");
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      setUser(userCredential.user);
      navigate('/workspace');
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);  // Ensure loading is set to false if an error occurs
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

  const givePermission = async () => {
    try {
      const data = await getDocs(query(invitedUserDataRef));
      const userData = data.docs.map(doc => ({
        id: doc.id,
        accessLevel: doc.data().accessLevel,
        email: doc.data().email,
      }));
  
      setInvUserData(userData);
      const userEmails = userData.map(user => user.email);
      setInvUserEmail(userEmails);
  
      console.log("Invited User Data:", userData);
      console.log("Invited User Emails:", userEmails);
    } catch (error) {
      console.error("Error fetching invited user data:", error);
    }
  };

  useEffect(() => {
    givePermission();
  }, []);
  return (
    <UserContext.Provider value={{ user, error, login, register, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
