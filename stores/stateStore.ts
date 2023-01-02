import create from "zustand";

interface StateStore {
  showAddPhoto: boolean;
  setState: (whichState: "showAddPhoto" | "notYet", state: boolean) => void;
}

export const useStateStore = create<StateStore>((set) => ({
  showAddPhoto: false,

  setState: (whichState, changedState) => {
    set((state: StateStore) => ({
      ...state,
      [whichState]: changedState,
    }));
  },
}));
