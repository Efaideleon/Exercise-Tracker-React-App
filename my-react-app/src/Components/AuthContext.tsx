import { createContext, useState, ReactNode, useEffect } from "react";
import axios from 'axios';

interface User {
    username: string;
    password: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    login: (userData: User) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    user: null,
    login: async () => Promise.resolve(false),
    logout: async () => { }
});

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/me', {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    setUser(response.data)
                    setIsLoggedIn(true)
                } else {
                    setUser(null)
                    setIsLoggedIn(false)
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
                setIsLoggedIn(false)
                setUser(null)
            }
        };

        fetchUserData();
    }, []);

    const loginHandler = async (userData: User): Promise<boolean> => {
        try {
            const response = await axios.post('http://localhost:5001/api/login', userData, {
                withCredentials: true,
            });

            if (response.status === 200) {
                setIsLoggedIn(true);
                setUser(userData);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Login Error", error)
            return false;
        }
    };

    const logoutHandler = async () => {
        try {
            await axios.post('http://localhost:5001/api/logout', {}, {
                withCredentials: true,
            })

            setIsLoggedIn(false);
            setUser(null);
            localStorage.removeItem('token');

        } catch (error) {
            console.error("Logout Error", error);
        }
    };

    const contextValue = {
        isLoggedIn: isLoggedIn,
        user: user,
        login: loginHandler,
        logout: logoutHandler
    };

    return <AuthContext.Provider value={contextValue}> {children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider };