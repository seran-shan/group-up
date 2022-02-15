import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import AuthContext from '../context/AuthContext';
// import { auth } from "../services/Firebase";

// const AuthProvider: React.FC = ({ children }) => {
//   const [user, setUser] = useState<firebase.User | null>(null);

//   useEffect(() => {
//       const unsubscribe = auth.onAuthStateChanged((userInFirebase) => {
//           setUser(userInFirebase);
//       });

//       return unsubscribe;
//   }, []);

//   return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
// };

// export default AuthProvider;
