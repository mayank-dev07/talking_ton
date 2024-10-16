import { create } from "zustand";

type UserState = {
  email: string | null;
  setEmail: (email: string) => void;
  clearEmail: () => void;
};

export const useUserStore = create<UserState>((set) => {
  const storedEmail = localStorage.getItem("email");
  return {
    email: storedEmail ? storedEmail : "",
    setEmail: (email) => {
      set({ email });
      if (email) {
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }
    },
    clearEmail: () => {
      set({ email: null });
      localStorage.removeItem("email");
    },
  };
});
