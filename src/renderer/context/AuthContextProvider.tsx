import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  authed: boolean;
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

  const signin = async (user: Auth) => {
    try {
      const response = await window.electron.login(user);
      setAuthed(true);
      return response;
    } catch (error) {
      console.error('Signin failed:', error);
      throw error; // Propagate the error for handling at a higher level if needed
    }
  };

  const register = async (user: any) => {
    try {
      await window.electron.register(user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => setAuthed(false);

  useEffect(() => {
    // You might want to add logic here to check initial authentication state on app load
  }, []);

  const value = { authed, signin, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
