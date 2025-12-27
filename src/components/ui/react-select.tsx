"use client";
import { cn } from "@/lib/utils";
import Select, { GroupBase, Props } from "react-select";
import { Label } from "@/components/ui/label";
import { ControllerFieldState } from "react-hook-form";
import { Loader2Icon } from "lucide-react";

type SelectProps<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>> = Props<Option, IsMulti, Group> & {
    label?: string;
    name: string;
    className?: string;
    onChange?: (value: any) => void;
    fieldState?: ControllerFieldState;
    isLoading?: boolean;
};

const ReactSelect = <Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>({
    label,
    className,
    fieldState,
    isLoading,
    ...props
}: SelectProps<Option, IsMulti, Group>) => {
    return (
        <div className="flex w-full flex-col gap-y-1">
            {label && <Label className="text-xs font-medium text-gray-700">{label}</Label>}
            <Select
                {...props}
                className={cn(
                    "border-input flex h-9.25! w-full min-w-0 rounded-md bg-white shadow-xs transition-[color,box-shadow] outline-none",
                    fieldState?.error && "border-destructive ring-destructive/20 ring-[3px]",
                    props.isDisabled ? "pointer-events-none cursor-not-allowed border-neutral-500 text-black" : "bg-white",
                    props["aria-invalid"] && "border-destructive/20 ring-destructive/20 ring-[3px]",
                    className,
                )}
                styles={{
                    control: (base, state) => {
                        const hasError = fieldState?.error;
                        const errorColor = "var(--destructive)";
                        const errorFocusColor = "(var(--destructive) / 0.2)";

                        return {
                            ...base,
                            display: "flex",
                            alignItems: "center",
                            minHeight: "100%",
                            width: "100%",
                            padding: "0 5px",
                            borderRadius: "7px",
                            fontSize: "12px",
                            backgroundColor: state.isDisabled ? "var(--muted)" : "var(--background)",
                            cursor: state.isDisabled ? "not-allowed" : "pointer",
                            opacity: state.isDisabled ? 0.5 : 1,
                            borderWidth: "1px",
                            borderColor: hasError ? errorColor : state.isFocused ? "oklch(from var(--primary) l c h / 50%)" : "var(--border)",
                            boxShadow: hasError
                                ? state.isFocused
                                    ? `0 0 0 3px ${errorFocusColor}`
                                    : "none"
                                : state.isFocused
                                  ? "0 0 0 3px oklch(from var(--primary) l c h / 50%)"
                                  : "none",
                            transition: "border-color 0.2s, box-shadow 0.2s",
                            "&:hover": {
                                borderColor: hasError ? errorColor : "oklch(from var(--primary) l c h / 50%)",
                                boxShadow: hasError
                                    ? state.isFocused
                                        ? `0 0 0 3px ${errorFocusColor}`
                                        : "none"
                                    : state.isFocused
                                      ? "0 0 0 3px oklch(from var(--primary) l c h / 50%)"
                                      : "none",
                            },
                        };
                    },
                    placeholder: (provided) => ({
                        ...provided,
                        fontSize: "12px",
                        margin: "0",
                        color: "var(--muted-foreground)",
                    }),
                    menu: (provided) => ({
                        ...provided,
                        zIndex: 999,
                        fontSize: "12px",
                        marginTop: "4px",
                        border: "1px solid var(--border)",
                        borderRadius: "6px",
                        backgroundColor: "var(--background)",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                    }),
                    option: (base, state) => ({
                        ...base,
                        cursor: state.isDisabled ? "not-allowed" : "pointer",
                        fontSize: "12px",
                        backgroundColor: state.isDisabled
                            ? "var(--muted)"
                            : state.isSelected && state.isFocused
                              ? "oklch(from var(--primary) l c h / 10%)"
                              : state.isFocused
                                ? "oklch(from var(--primary) l c h / 5%)"
                                : state.isSelected
                                  ? "oklch(from var(--primary) l c h / 10%)"
                                  : "transparent",

                        color: state.isDisabled
                            ? "var(--muted-foreground)"
                            : state.isFocused || state.isSelected
                              ? "var(--primary)"
                              : "var(--foreground)",
                        ":active": {
                            backgroundColor: "oklch(from var(--primary) l c h / 10%)",
                        },
                    }),
                    singleValue: (provided, state) => ({
                        ...provided,
                        fontSize: "12px",
                        margin: "0",
                        color: state.isDisabled ? "var(--muted-foreground)" : "var(--foreground)",
                    }),
                    multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#afcecf",
                        borderRadius: "4px",
                        padding: "2px 2px",
                        fontSize: "12px",
                    }),
                    multiValueLabel: (base) => ({
                        ...base,
                        color: "#004849",
                        fontWeight: 500,
                    }),
                    multiValueRemove: (base) => ({
                        ...base,
                        color: "#004849",
                        cursor: "pointer",
                        ":hover": {
                            backgroundColor: "#89b7b8",
                            color: "#013738",
                        },
                    }),
                    menuList: (base) => ({
                        ...base,
                        maxHeight: 150,
                        overflowY: "auto",
                    }),

                    ...(props.styles || {}),
                }}
            />

            {isLoading && (
                <span className="text-[0.65rem] text-gray-600 italic">
                    <Loader2Icon className="mr-2 inline-flex h-3 w-3 animate-spin" />
                    Loading
                </span>
            )}
        </div>
    );
};

export default ReactSelect;
