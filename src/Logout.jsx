import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserProvider'; // Import your UserContext

const Logout = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useContext(UserContext); // Get context

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/user/logout', {
          method: 'Get', // Ensure backend supports POST for logout
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          setUser(null);  // Reset user in context
          setIsLoggedIn(false);  // Update auth state

          // Optionally clear local storage if you store tokens
          localStorage.removeItem('userToken'); 

          navigate('/'); // Redirect to homepage or login page
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    logoutUser();
  }, [navigate, setUser, setIsLoggedIn]);

  return <p>Logging out...</p>;
};

export default Logout;
