import { createContext, useContext, useEffect, useState } from "react";
import nookies from 'nookies'
import axios from "axios";
import { ChildrenType, ContextType } from "./AuthContextTypes";

export const AuthContext = createContext<ContextType>({} as ContextType)

export const AuthContextProvider = ({ children }: ChildrenType) => {
    const [user, setUser] = useState({} as ContextType);

    const handleAuthentication = async (authToken: string) => {
        try {
            const validation = await axios.post('/api/auth/validation', {
                authToken
            });
            const { username, role } = validation.data;
            setUser({ username, role });
        } catch (err) { }
    }

    useEffect(() => {
        const { authToken } = nookies.get(null)
        if (authToken) {
            handleAuthentication(authToken);
        }
    }, [])


    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}