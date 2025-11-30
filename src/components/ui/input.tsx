"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const inputVariant =
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:bg-neutral-200 disabled:border-neutral-300 placeholder:text-xs text-xs";

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border-input selection:bg-primary selection:text-primary-foreground file:text-foreground placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-primary/50 dark:bg-input/30 flex h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-xs shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-xs focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-neutral-200 disabled:opacity-50 md:text-sm",
                props["aria-invalid"] && "border-destructive/20 ring-destructive/20 ring-[3px]",
                className,
            )}
            ref={ref}
            onWheel={(e) => e.currentTarget.blur()}
            {...props}
        />
    );
});

Input.displayName = "Input";

export { Input };
