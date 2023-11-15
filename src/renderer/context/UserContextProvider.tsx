import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserType } from 'renderer/types/user.type';



type UserContextType = {
  loggedInUser: UserType | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  authToken: string | null;
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  checkUserLoggedIn: () => void;
  getLoggedInUser: () => UserType | null;
  signOutUser: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserContextProvider = ({ children }: any) => {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>({
    role:""
  });
  const [authToken, setAuthToken] = useState<string | null>(null);

  const checkUserLoggedIn = () => {
    // Implement this if needed
  };

  const signOutUser = () => {
    // Implement this if needed
  };

  const getLoggedInUser = () => {
    // Implement this if needed
    return null;
  };

  const contextValue: UserContextType = {
    loggedInUser,
    setLoggedInUser,
    authToken,
    setAuthToken,
    checkUserLoggedIn,
    getLoggedInUser,
    signOutUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};
