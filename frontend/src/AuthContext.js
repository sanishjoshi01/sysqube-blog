import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from './API';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('auth_token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('auth_token', authToken);
    };

    const logout = async () => {
        try {
            await axios.post('/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setUser(null);
            setToken(null);
            localStorage.removeItem('user');
            localStorage.removeItem('auth_token');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
