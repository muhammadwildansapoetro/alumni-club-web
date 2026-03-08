import { create } from "zustand";

interface DialogStore {
    dialogs: Record<string, { isOpen: boolean; data: unknown }>;
    onOpen: (key: string, data?: unknown) => void;
    onClose: (key: string) => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
    dialogs: {},
    onOpen: (key, data) =>
        set((state) => ({
            dialogs: { ...state.dialogs, [key]: { isOpen: true, data } },
        })),
    onClose: (key) =>
        set((state) => ({
            dialogs: {
                ...state.dialogs,
                [key]: { isOpen: false, data: state.dialogs[key]?.data },
            },
        })),
}));
