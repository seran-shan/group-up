import React, { useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signOut, User } from '@firebase/auth';
import { auth } from '../services/Firebase';
import AuthContext, { IAuthContext } from '../context/AuthContext';

export const useAuth = () => useContext<IAuthContext>(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signout = () => {
    signOut(auth).catch((err) => {
      alert(err);
    });
  };

  const signup = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setLoading(false);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const values: IAuthContext = {
    user: currentUser,
    signup,
    signout,
  };

  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
