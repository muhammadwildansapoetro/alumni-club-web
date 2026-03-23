import {
    BriefcaseBusinessIcon,
    ChartColumnBigIcon,
    HandshakeIcon,
    UserCheckIcon,
    UsersIcon,
} from "lucide-react";

export interface INavigation {
    name: string;
    icon?: any;
    href?: string;
    active: string[];
    children?: INavigation[];
    access?: string[];
    module_ids?: string[];
    roles?: any[];
}

export const NAVIGATIONS: INavigation[] = [
    {
        name: "Statistik",
        icon: ChartColumnBigIcon,
        href: "/dashboard",
        roles: [],
        active: ["/dashboard"],
    },
    {
        name: "Alumni",
        icon: UsersIcon,
        href: "/dashboard/alumni",
        roles: [],
        active: ["/dashboard/alumni"],
    },
    {
        name: "Pengurus",
        icon: UserCheckIcon,
        href: "/dashboard/alumni/administrator",
        roles: ["ADMIN"],
        active: ["/dashboard/alumni/administrator"],
    },
    {
        name: "Pekerjaan",
        icon: BriefcaseBusinessIcon,
        href: "/dashboard/jobs",
        roles: [],
        active: ["/dashboard/jobs"],
    },
    {
        name: "Bisnis",
        icon: HandshakeIcon,
        href: "/dashboard/business",
        roles: [],
        active: ["/dashboard/business"],
    },
];

export const filterNavigationByRole = (userRole: string, navigation: INavigation[]): INavigation[] => {
    return navigation
        .map((item) => {
            // Check if item has roles restriction and user doesn't have access
            if (item.roles && item.roles.length > 0 && !item.roles.includes(userRole)) {
                return null;
            }

            if (item.children) {
                const filteredChildren = filterNavigationByRole(userRole, item.children);
                if (filteredChildren.length === 0) {
                    return { ...item, children: undefined };
                }
                return { ...item, children: filteredChildren };
            }

            return item;
        })
        .filter((item): item is INavigation => item !== null);
};
