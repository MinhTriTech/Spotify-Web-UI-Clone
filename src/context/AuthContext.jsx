import { createContext, useContext, useEffect, useState } from "react";
import { getMyProfile } from "../services/user.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getMyProfile();
                setUser(res);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <AuthContext.Provider
        value={{
            user,
            isAuthenticated: !!user,
            loading,
            login,
            logout
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);