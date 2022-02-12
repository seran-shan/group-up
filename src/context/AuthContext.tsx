import React from 'react';
import firebase from 'firebase/compat/app';

const AuthContext = React.createContext<firebase.User | null>(null);

export default AuthContext;
