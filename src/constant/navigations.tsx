import {
    AppleIcon,
    BriefcaseBusinessIcon,
    ChartColumnBigIcon,
    ClipboardPenLineIcon,
    StoreIcon,
    TractorIcon,
    TrophyIcon,
    UserCheckIcon,
    UsersIcon,
    WarehouseIcon,
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
        active: [
            "/dashboard/alumni/administrator",
            "/dashboard/alumni/agricultural-engineering",
            "/dashboard/alumni/food-technology",
            "/dashboard/alumni/agricultural-industrial-technology",
        ],
        children: [
            {
                name: "Teknik Pertanian",
                icon: TractorIcon,
                href: "/dashboard/alumni/agricultural-engineering",
                roles: [],
                active: ["/dashboard/alumni/agricultural-engineering"],
            },
            {
                name: "Teknologi Pangan",
                icon: AppleIcon,
                href: "/dashboard/alumni/food-technology",
                roles: [],
                active: ["/dashboard/alumni/food-technology"],
            },
            {
                name: "Teknologi Industri Pertanian",
                icon: WarehouseIcon,
                href: "/dashboard/alumni/agricultural-industrial-technology",
                roles: [],
                active: ["/dashboard/alumni/agricultural-industrial-technology"],
            },
            {
                name: "Pengurus Ikatan Alumni",
                icon: UserCheckIcon,
                href: "/dashboard/alumni/administrator",
                roles: [],
                active: ["/dashboard/alumni/administrator"],
            },
        ],
    },
    {
        name: "Pekerjaan",
        icon: BriefcaseBusinessIcon,
        href: "/dashboard/jobs",
        roles: [],
        active: ["/dashboard/jobs"],
    },
    {
        name: "Toko",
        icon: StoreIcon,
        href: "/dashboard/shop",
        roles: [],
        active: ["/dashboard/shop"],
    },
    {
        name: "Survei",
        icon: ClipboardPenLineIcon,
        href: "/dashboard/survey",
        roles: [],
        active: ["/dashboard/survey"],
    },
    {
        name: "Penghargaan",
        icon: TrophyIcon,
        href: "/dashboard/award",
        roles: [],
        active: ["/dashboard/award"],
    },
];

export const filterNavigationByAccess = (userAccess: string, navigation: INavigation[]): INavigation[] => {
    return navigation
        .map((item) => {
            if (item.access && !item.access.includes(userAccess)) {
                return null;
            }

            if (item.children) {
                const filteredChildren = filterNavigationByAccess(userAccess, item.children);
                if (filteredChildren.length === 0) {
                    return { ...item, children: undefined };
                }
                return { ...item, children: filteredChildren };
            }

            return item;
        })
        .filter((item): item is INavigation => item !== null);
};

export function flattenNavigation(navigation: INavigation[]): INavigation[] {
    const flattened: INavigation[] = [];

    function flatten(items: INavigation[]) {
        items.forEach((item) => {
            const { children, ...rest } = item;
            if (children) {
                flatten(children);
            }
            flattened.push(rest);
        });
    }

    flatten(navigation);
    return flattened;
}
