import { User } from "@/types/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
    user: User | null;
    isLoading: boolean;

    setUser: (user: User) => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,

            isLoading: false,
            error: null,

            setUser: (user) => set({ user }),
            setLoading: (isLoading) => set({ isLoading }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user: state.user }),
        },
    ),
);
