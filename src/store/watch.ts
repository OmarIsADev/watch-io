import { create } from "zustand";
import type { series } from "@/types";

type watchlist = Omit<series, "episodes" | "description">;
type watched = Omit<series, "description"> & { ep: number[] };

interface WatchStore {
  watchlist: watchlist[];
  watched: watched[];
  setWatchlist: (watchlist: watchlist[]) => void;
  setWatched: (watched: watched[]) => void;
}

export const watchStore = create<WatchStore>()((set) => ({
  watchlist: [],
  watched: [],

  setWatchlist: (watchlist) => set({ watchlist }),
  setWatched: (watched) => set({ watched }),
}));
