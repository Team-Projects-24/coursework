import { IUser } from "types/User.d";
import { create } from "zustand";

/**
 * @author Tom Whitticase
 *
 * @description A store for managing the current user logged in throughout the application.
 */

interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user: IUser | null) => set((state: IUserStore) => ({ user: user })),
}));

export default useUserStore;
