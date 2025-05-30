import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/user/CheckLoggedIn', {
                    credentials: 'include',
                });

                const data = await response.json();

                if (data.status === true) {
                    setUser(data.getUser);
                    setIsLoggedIn(true);
                } else {
                    setUser(null);
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error fetching login status:', error.message);
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoggedIn, loading, setUser, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};
