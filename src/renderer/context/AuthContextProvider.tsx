import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOAST_TYPE } from 'renderer/constants/AppConstants';
import { User } from 'renderer/types/user.type';
import { CommonUtils } from 'renderer/utils/CommonUtils';

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
  const [userDetails, setUserDetails] = useState<User | undefined>(() => {
    // Retrieve user details from local storage on component mount
    const storedUserDetails = localStorage.getItem('userDetails');
    return storedUserDetails ? JSON.parse(storedUserDetails) : undefined;
  });

  const navigate = useNavigate();
  const signin = async (user: Auth) => {
    try {
      const response = await window.electron.login(user);

      if (response !== false) {
        setUserDetails(response);
        setAuthed(true);
        localStorage.setItem('userDetails', JSON.stringify(response));
        CommonUtils().showToast(
          TOAST_TYPE.SUCCESS,
          `${response?.name} logged in as ${response?.role}`,
        );
        return response;
      } else {
        CommonUtils().showToast(
          TOAST_TYPE.ERROR,
          'Please give the correct login Credential',
        );
      }
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
    // Clear userDetails on logout
    setUserDetails(undefined);
    setAuthed(false);

    // Remove user details from local storage on logout
    localStorage.removeItem('userDetails');
  };

  useEffect(() => {
    // Check if user is already authenticated on component mount
    if (userDetails) {
      setAuthed(true);
    }
  }, [userDetails]);
  const value = { authed, userDetails, signin, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
