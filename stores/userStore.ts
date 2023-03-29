import { IUser } from "types/User.d";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const useUserStore = create(
  persist(
    devtools<IUserStore>(
      (set) => ({
        user: null,
        setUser: (user: IUser | null) => set({ user }),
      }),
    ),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
