import create from "zustand";

interface SeriesItem {
  fileUrl: string;
  fileName: string;
  owenrUid: string;
  createdAt: Date;
}

interface Series {
  series: [{ docId: string; data: [SeriesItem] }] | null;
  setSeries: (series: any) => void;
}

export const useSeriesStore = create<Series>((set) => ({
  series: null,
  setSeries: (series) => {
    set((state) => ({ ...state, series }));
  },
}));
