import React from 'react';
import { User } from '@firebase/auth';

export interface IAuthContext {
  user: User | null;
  signup: (
    email: string,
    password: string,
    name: string,
    date: string | unknown
  ) => void;
  signout: () => void;
}

const AuthContext = React.createContext<IAuthContext>({
  user: null,
  signup: () => {},
  signout: () => {},
});

export default AuthContext;
