import { create } from "zustand";
import { useEffect, useState } from "react";

type UserState = {
  email: string | null;
  setEmail: (email: string) => void;
  clearEmail: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  email: null,
  setEmail: (email) => {
    set({ email });
    if (typeof window !== "undefined") {
      if (email) {
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }
    }
  },
  clearEmail: () => {
    set({ email: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("email");
    }
  },
}));

export const useInitializeEmail = () => {
  const setEmail = useUserStore((state) => state.setEmail);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !initialized) {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) {
        setEmail(storedEmail);
      }
      setInitialized(true);
    }
  }, [setEmail, initialized]);
};
