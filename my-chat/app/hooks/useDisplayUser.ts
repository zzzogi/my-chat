import { User } from "@prisma/client";
import { create } from "zustand";

interface DisplayUserStore {
  members: User[];
  add: (user: User[]) => void;
  isLoading: boolean;
  gettingUser: () => void;
  gettingUserDone: () => void;
}

const useDisplayUser = create<DisplayUserStore>((set) => ({
  members: [],
  add: (user) =>
    set(() => ({
      members: [...user],
    })),
  isLoading: false,
  gettingUser: () =>
    set(() => ({
      isLoading: true,
    })),
  gettingUserDone: () =>
    set(() => ({
      isLoading: false,
    })),
}));

export default useDisplayUser;
