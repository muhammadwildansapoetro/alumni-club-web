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
            <Select {...props} className={cn()} />

            {isLoading && (
                <span className="text-[0.65rem] text-gray-600 italic">
                    <Loader2Icon className="mr-2 inline-flex h-3 w-3 animate-spin" />
                    Sedang Memuat Data...
                </span>
            )}
        </div>
    );
};

export default ReactSelect;
