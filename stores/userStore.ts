import create from "zustand";
import { User as FirebaseUser } from "firebase/auth";

interface IStore {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser) => void;
}

export const useUserStore = create<IStore>((set) => ({
  user: null,
  setUser: (user) => {
    set((state) => ({ ...state, user }));
  },
}));
