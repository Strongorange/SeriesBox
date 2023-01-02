import create from "zustand";
import { User as FirebaseUser } from "firebase/auth";
import { devtools } from "zustand/middleware";

interface IStore {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
}

export const useUserStore = create<IStore>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => {
      set((state) => ({ ...state, user }));
    },
  }))
);
