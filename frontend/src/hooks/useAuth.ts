import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setUser(jwt_decode(storedToken));
    }
  }, []);

  const login = async (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setUser(jwt_decode(newToken));
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null);
  };

  const isLoggedIn = () => {
    return token !== null;
  };

  return { token, user, login, logout, isLoggedIn };
};

export default useAuth;