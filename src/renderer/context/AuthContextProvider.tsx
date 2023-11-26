import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'renderer/types/user.type';

interface AuthContextType {
  authed: boolean;
  userDetails?: User; // Make userDetails optional
  signin: (user: Auth) => Promise<any>;
  register: (user: Auth) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  authed: false,
  signin: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authed, setAuthed] = useState(false);
  const [userDetails, setUserDetails] = useState<User | undefined>();

  const navigate = useNavigate();
  const signin = async (user: Auth) => {
    try {
      const response = await window.electron.login(user);
      setUserDetails(response);
      // response === true && setAuthed(true);
      setAuthed(true);
      return response;
    } catch (error) {
      console.error('Signin failed:', error);
      throw error;
    }
  };

  const register = async (user: Auth) => {
    try {
      const registered = await window.electron.register(user);
      registered === true && navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUserDetails(undefined); // Clear userDetails on logout
    setAuthed(false);
  };

  useEffect(() => {
    // You might want to add logic here to check the initial authentication state on app load
  }, []);

  const value = { authed, userDetails, signin, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
