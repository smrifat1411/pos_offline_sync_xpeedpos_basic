"use client";
import {
  useEffect,
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { UserType } from "../types/user.type";

import { toast } from "react-toastify";

type UserContextType = {
  user?: UserType;
  setUser?: Dispatch<SetStateAction<UserType>>;
  allUsers?: UserType[];
  reFetchUsers?: () => void;
};

const USER_CONTEXT = createContext<UserContextType>({});

export const useUser = () => useContext(USER_CONTEXT);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({
    role:""
  });
  const [allUsers, setAllUsers] = useState<UserType[]>([]);


  useEffect(() => {
    const authenticate = () => {
      // if (!user.role && pathName != "/login" && pathName != "/signup") {
      //   // router.push("/login");
      // }

      document.addEventListener("selectstart", (e) => e.preventDefault());
      document.addEventListener("contextmenu", (e) => e.preventDefault());

      function ctrlShiftKey(e: KeyboardEvent, keyCode: string) {
        return e.ctrlKey && e.shiftKey && e.code === keyCode;
      }

      document.onkeydown = (e) => {
        if (
          e.key === "F12" ||
          ctrlShiftKey(e, "KeyI") ||
          ctrlShiftKey(e, "KeyJ") ||
          ctrlShiftKey(e, "KeyC") ||
          (e.ctrlKey && e.code === "KeyU")
        )
          return false;
      };
    };

    authenticate();

    return () => {
      authenticate();
    };
  }, [user]);

  useEffect(() => {
    if (user.role === "admin") {
    }
  }, [user]);

  const reFetchUsers = () => {
    if (user.role === "admin") {

    }
  };

  return (
    <USER_CONTEXT.Provider value={{ user, setUser, allUsers, reFetchUsers }}>
      {children}
    </USER_CONTEXT.Provider>
  );
};

export default UserContextProvider;
