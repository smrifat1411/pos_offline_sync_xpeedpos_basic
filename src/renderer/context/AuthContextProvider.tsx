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

      if (response.success) {
        setUserDetails(response.data);
        setAuthed(true);
        localStorage.setItem('userDetails', JSON.stringify(response.data));
        CommonUtils().showToast(
          TOAST_TYPE.SUCCESS,
          `${response?.data?.name} logged in as ${response?.data?.role}`,
        );
        return response.data;
      } else {
        CommonUtils().showToast(
          TOAST_TYPE.ERROR,
          response.error || 'Login failed. Please check your credentials.',
        );
      }
    } catch (error) {
      console.error('Signin failed:', error);
      CommonUtils().showToast(
        TOAST_TYPE.ERROR,
        'Signin failed. Please try again.',
      );
      throw error;
    }
  };

  const register = async (user: Auth) => {
    try {
      const response = await window.electron.register(user);

      if (response.success) {
        navigate('/login');
        CommonUtils().showToast(
          TOAST_TYPE.SUCCESS,
          'Registration successful. Please login.',
        );
      } else {
        CommonUtils().showToast(
          TOAST_TYPE.ERROR,
          response.error || 'Registration failed. Please try again.',
        );
      }
    } catch (error) {
      console.error('Registration failed:', error);
      CommonUtils().showToast(
        TOAST_TYPE.ERROR,
        'Registration failed. Please try again.',
      );
      throw error;
    }
  };

  const logout = () => {
    const userName = userDetails?.name || 'User';
    CommonUtils().showToast(TOAST_TYPE.INFO, `${userName}, you are logged out.`);

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
