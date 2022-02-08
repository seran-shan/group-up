import { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import firebase from "firebase/compat/app";
import { auth } from "../services/Firebase";

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        });

        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}