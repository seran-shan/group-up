import React from 'react';
import { User } from '@firebase/auth';
import { Group } from '../types/group';

export interface IAuthContext {
  user: User | null;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    birthday: Date
  ) => void;
  signout: () => void;
  login: (email: string, password: string) => void;
}

const AuthContext = React.createContext<IAuthContext>({
  user: null,
  signup: () => {},
  signout: () => {},
  login: () => {},
});

export default AuthContext;
