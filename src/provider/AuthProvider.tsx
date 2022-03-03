import React, { useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@firebase/auth';
import { auth, createUser } from '../services/Firebase';
import AuthContext, { IAuthContext } from '../context/AuthContext';

export const useAuth = () => useContext<IAuthContext>(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signout = () => {
    signOut(auth);
  };

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    birthday: Date
  ) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await createUser(firstName, lastName, email, birthday, res.user.uid);
  };

  const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const values: IAuthContext = {
    user: currentUser,
    signup,
    signout,
    login,
  };

  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
