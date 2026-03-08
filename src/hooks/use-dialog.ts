import { useDialogStore } from "@/stores/dialog.store";

export function useDialog(): {
    onOpen: (key: string, data?: unknown) => void;
    onClose: (key: string) => void;
};
export function useDialog<T>(key: string): {
    isOpen: boolean;
    data: T;
    onOpen: (data?: T) => void;
    onClose: () => void;
};
export function useDialog<T = unknown>(key?: string) {
    const store = useDialogStore();

    if (key) {
        const dialog = store.dialogs[key] ?? { isOpen: false, data: undefined };
        return {
            isOpen: dialog.isOpen,
            data: dialog.data as T,
            onOpen: (data?: T) => store.onOpen(key, data),
            onClose: () => store.onClose(key),
        };
    }

    return {
        onOpen: store.onOpen,
        onClose: store.onClose,
    };
}
