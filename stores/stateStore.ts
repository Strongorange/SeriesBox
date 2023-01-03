import create from "zustand";

interface StateStore {
  showAddPhoto: boolean;
  showPushPhotoToSeries: boolean;
  setState: (
    whichState: "showAddPhoto" | "showPushPhotoToSeries" | "notYet",
    state: boolean
  ) => void;
}

export const useStateStore = create<StateStore>((set) => ({
  showAddPhoto: false,
  showPushPhotoToSeries: false,
  setState: (whichState, changedState) => {
    set((state: StateStore) => ({
      ...state,
      [whichState]: changedState,
    }));
  },
}));
