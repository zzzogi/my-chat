import { User } from "@prisma/client";
import { create } from "zustand";

interface DisplayUserStore {
  members: User[];
  add: (user: User[]) => void;
}

const useDisplayUser = create<DisplayUserStore>((set) => ({
  members: [],
  add: (user) =>
    set(() => ({
      members: [...user],
    })),
}));

export default useDisplayUser;
