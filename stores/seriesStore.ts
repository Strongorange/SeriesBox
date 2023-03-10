import create from "zustand";
import { devtools } from "zustand/middleware";

export interface SeriesItem {
  fileUrl: string;
  fileName: string;
  owenrUid: string;
  createdAt: string;
}

export interface SeriesDocument {
  docId: string;
  data: SeriesItem[];
  docPhotoUrl: string;
}

interface SeriesStore {
  series: SeriesDocument[];
  setSeries: (series: SeriesDocument) => void;
  clearSeries: () => void;
}

export const useSeriesStore = create<SeriesStore>()((set) => ({
  series: [],
  setSeries: (series) => {
    set((state) => ({ ...state, series: [...state.series, series] }));
  },
  clearSeries: () => {
    set((state) => ({ ...state, series: [] }));
  },
}));
