import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import * as React from "react";

const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-[5px] border px-2 py-0.5 text-[0.65rem] tracking-wide font w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden capitalize",
    {
        variants: {
            variant: {
                default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
                destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
                outline: "text-foreground border-primary text-primary hover:bg-primary/5",

                active: "border-[#3A903B] text-[#3A903B] bg-[#DBFFDC] hover:bg-[#DBFFDC]/70 text-xs",
                inactive: "border-[#903A3A] text-[#903A3A] bg-[#FFDBDB] hover:bg-[#FFDBDB]/70 text-xs",

                admin: "border-[#DC2626] text-[#DC2626] bg-transparent hover:bg-[#FEE2E2] text-xs",
                super_admin: "border-[#DC2626] text-[#DC2626] bg-transparent hover:bg-[#FEE2E2] text-xs",
                customer: "border-[#2563EB] text-[#2563EB] bg-transparent hover:bg-[#EFF6FF] text-xs",

                hospitality: "border-[#9333EA] text-[#9333EA] bg-transparent hover:bg-[#F3E8FF] text-xs",
                guest_house: "border-[#9333EA] text-[#9333EA] bg-transparent hover:bg-[#F3E8FF] text-xs",
                apartment: "border-[#9333EA] text-[#9333EA] bg-transparent hover:bg-[#F3E8FF] text-xs",
                sport_center: "border-[#3A903B] text-[#3A903B] bg-transparent hover:bg-[#DBFFDC]/70 text-xs",
                vehicle: "border-[#B45309] text-[#B45309] bg-transparent hover:bg-[#FFFBEB] text-xs",
                hall: "border-[#0891B2] text-[#0891B2] bg-transparent hover:bg-[#ECFEFF] text-xs",

                furniture: "border-[#B45309] text-[#B45309] bg-transparent hover:bg-[#FFFBEB] text-xs",
                visual: "border-[#2563EB] text-[#2563EB] bg-transparent hover:bg-[#EFF6FF] text-xs",
                other: "border-[#374151] text-[#374151] bg-transparent hover:bg-[#F3F4F6] text-xs",

                percentage: "border-[#2563EB] text-[#2563EB] bg-transparent hover:bg-[#EFF6FF] text-xs",
                fixed: "border-[#3A903B] text-[#3A903B] bg-[#DBFFDC] hover:bg-[#DBFFDC]/70 text-xs",

                paid: "border-[#3A903B] text-[#3A903B] bg-[#DBFFDC] hover:bg-[#DBFFDC]/70 text-xs",
                unpaid: "border-[#B7791F] text-[#B7791F] bg-[#FFF2C6] hover:bg-[#FFF2C6]/70 text-xs",

                waiting_for_payment: "border-[#B7791F] text-[#B7791F] bg-[#FFF2C6] hover:bg-[#FFF2C6]/70 text-xs",
                booked: "border-[#3A903B] text-[#3A903B] bg-[#DBFFDC] hover:bg-[#DBFFDC]/70 text-xs",
                cancelled: "border-[#903A3A] text-[#903A3A] bg-[#FFDBDB] hover:bg-[#FFDBDB]/70 text-xs",

                student: "border-[#3B82F6] text-[#3B82F6] bg-transparent hover:bg-[#EFF6FF] text-xs",
                lecturer: "border-[#7C3AED] text-[#7C3AED] bg-transparent hover:bg-[#F3E8FF] text-xs",
                staff: "border-[#059669] text-[#059669] bg-transparent hover:bg-[#ECFDF5] text-xs",
                nu: "border-[#B45309] text-[#B45309] bg-transparent hover:bg-[#FFFBEB] text-xs",
                public: "border-[#6B7280] text-[#6B7280] bg-transparent hover:bg-[#F9FAFB] text-xs",
                student_activity: "border-[#2563EB] text-[#2563EB] bg-transparent hover:bg-[#EFF6FF] text-xs",
                general: "border-[#374151] text-[#374151] bg-transparent hover:bg-[#F3F4F6] text-xs",
                department_activity: "border-[#047857] text-[#047857] bg-transparent hover:bg-[#ECFDF5] text-xs",
            },

            size: {
                default: "text-sm",
                xs: "text-[0.675rem]",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
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
