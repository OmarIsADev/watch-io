import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  email: string;
  img: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const userStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default userStore;
