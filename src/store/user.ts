import { create } from "zustand";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  img?: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;

  getUser: () => void;
  logout: () => void;
};

const userStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  getUser: async () => {
    const res = await fetch("/api/auth/data");

    if (!res.ok) return;
    const user = await res.json();

    return set({ user });
  },
  logout: async () => {
    const res = await fetch("/api/auth/logout");

    if (!res.ok) return;
    const { loggedOut } = (await res.json()) as { loggedOut: boolean };

    return loggedOut && set({ user: null });
  },
}));

export default userStore;
