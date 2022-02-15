import React from 'react';
import firebase from 'firebase/app';

export interface IFirebaseContext {
  firebase: firebase.FirebaseApp;
  authProviders: string[];
}

const AuthContext = React.createContext({} as any);

export default AuthContext;
