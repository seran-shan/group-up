import React, { useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, User } from '@firebase/auth';
import { auth } from '../services/Firebase';
import AuthContext, { IAuthContext } from '../context/AuthContext';

export const useAuth = () => useContext<IAuthContext>(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const signup = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const values: IAuthContext = {
    user: currentUser,
    signup,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
