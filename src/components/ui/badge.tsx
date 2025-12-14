import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import * as React from "react";

const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-[5px] border tracking-wide font-bold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden capitalize",
    {
        variants: {
            variant: {
                default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
                destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
                outline: "text-foreground border-primary text-primary hover:bg-primary/5",
                admin: "text-blue-500 border-blue-500 ",
                TEP: "border-green-600 text-green-600 bg-transparent hover:bg-green-50",
                TPN: "border-red-600 text-red-600 bg-transparent hover:bg-red-50",
                TIN: "border-orange-600 text-orange-600 bg-transparent hover:bg-orange-50",
            },

            size: {
                xs: "text-[0.65rem] px-1.5 py-0.5",
                sm: "text-[0.7rem] px-2 py-0.5",
                md: "text-sm px-2.5 py-1",
                lg: "text-base px-3 py-1.5",
                xl: "text-lg px-4 py-2",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "xl",
        },
    },
);

export interface BadgeProps extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
    asChild?: boolean;
    onRemove?: () => void;
}
function Badge({ className, variant, asChild = false, children, size, onRemove, ...props }: BadgeProps) {
    const Comp = asChild ? Slot : "span";
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient ? (
        <Comp
            data-slot="badge"
            className={cn(
                badgeVariants({
                    variant,
                    size,
                }),
                className,
            )}
            {...props}
        >
            <span className="leading-tight">{children}</span>
            {onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="ml-1 inline-flex items-center justify-center rounded p-1 hover:cursor-pointer hover:bg-red-600 dark:hover:bg-white/10"
                >
                    <XIcon className="h-3 w-3" />
                </button>
            )}
        </Comp>
    ) : null;
}

export { Badge, badgeVariants };
