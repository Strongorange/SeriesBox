import create from "zustand";

interface StateStore {
  showAddPhoto: boolean;
  showPushPhotoToSeries: boolean;
  showBottomNav: boolean;
  setState: (
    whichState: "showAddPhoto" | "showPushPhotoToSeries" | "notYet",
    state: boolean
  ) => void;
  setShowBottomNav: (showBottomNav: boolean) => void;
}

export const useStateStore = create<StateStore>((set) => ({
  showAddPhoto: false,
  showPushPhotoToSeries: false,
  showBottomNav: true,
  setState: (whichState, changedState) => {
    set((state: StateStore) => ({
      ...state,
      [whichState]: changedState,
    }));
  },
  setShowBottomNav: (showBottomNav) => {
    set((state: StateStore) => ({
      ...state,
      showBottomNav: showBottomNav,
    }));
  },
}));
