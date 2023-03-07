import create from "zustand";
import { User as FirebaseUser } from "firebase/auth";
import { devtools } from "zustand/middleware";

interface IStore {
  user: FirebaseUser | null;
  isGuest: boolean;
  setUser: (user: FirebaseUser | null) => void;
  setIsGuest: (isGuest: boolean) => void;
}

export const useUserStore = create<IStore>()(
  devtools((set) => ({
    user: null,
    isGuest: false,
    setUser: (user) => {
      set((state) => ({ ...state, user }));
    },
    setIsGuest: (isGuest) => {
      set((state) => ({ ...state, isGuest: isGuest }));
    },
  }))
);
