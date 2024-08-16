import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, logout, checkLogin } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [checked, setChecked] = useState(false);
  const [tokenError, setTokenError] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("token");
    console.log(token)
    const authenticate = async () => {
      try {
        if (token) {
          const result = await checkLogin();
          setUser(result)
        } else{
          setUser(null)
        }
      } catch (error) {
        setUser(null);
      } finally {
        setChecked(true)
      }
    };
    authenticate();

  }, []);

  const handleLogin = async (username, password) => {
    try {
      const result = await login(username, password);

      setUser(result.data.user);
      //setChecked(true)
      return result.data.user;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      // setChecked(false)
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, checked, setChecked, tokenError, setTokenError, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
