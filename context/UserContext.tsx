import React, { createContext, useContext } from "react";
import { IUser } from "../types/User.d";

// Create the context object
export const UserContext = createContext<IUser | undefined>(undefined);

export const useUserContext = () => useContext(UserContext);

interface IProps {
  children: React.ReactNode;
}
export function UserContextProvider({ children }: IProps) {
  const currentUser: IUser = {
    name: "New Guy",
    role: "employee",
    email: "new@make-it-all.co.uk",
    profileImage:
      "https://avatars.steamstatic.com/1db4acc0604744a20715d96766e26b26d86ebfc4_full.jpg",
  };

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
}
