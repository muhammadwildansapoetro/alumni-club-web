import { useState, useEffect } from "react";

/**
 * Hook to detect if the current viewport is mobile-sized
 * @returns boolean - true if viewport width is less than 1024px (lg breakpoint)
 */
export function useMobile(): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check initial viewport size
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024); // lg: 1024px in Tailwind
        };

        // Run initial check
        checkMobile();

        // Add resize listener
        window.addEventListener("resize", checkMobile);

        // Cleanup
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    return isMobile;
}

/**
 * Hook to detect if the current viewport is tablet-sized
 * @returns boolean - true if viewport width is between 768px and 1023px
 */
export function useTablet(): boolean {
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const checkTablet = () => {
            const width = window.innerWidth;
            setIsTablet(width >= 768 && width < 1024); // md: 768px to lg: 1023px
        };

        checkTablet();
        window.addEventListener("resize", checkTablet);

        return () => {
            window.removeEventListener("resize", checkTablet);
        };
    }, []);

    return isTablet;
}

/**
 * Hook to detect if the current viewport is desktop-sized
 * @returns boolean - true if viewport width is 1024px or more
 */
export function useDesktop(): boolean {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024); // lg: 1024px
        };

        checkDesktop();
        window.addEventListener("resize", checkDesktop);

        return () => {
            window.removeEventListener("resize", checkDesktop);
        };
    }, []);

    return isDesktop;
}

/**
 * Hook to get current breakpoint
 * @returns string - current breakpoint name ('sm', 'md', 'lg', 'xl', '2xl')
 */
export function useBreakpoint(): string {
    const [breakpoint, setBreakpoint] = useState<"sm" | "md" | "lg" | "xl" | "2xl">("lg");

    useEffect(() => {
        const getBreakpoint = () => {
            const width = window.innerWidth;
            if (width >= 1536) return "2xl"; // 2xl: 1536px
            if (width >= 1280) return "xl"; // xl: 1280px
            if (width >= 1024) return "lg"; // lg: 1024px
            if (width >= 768) return "md"; // md: 768px
            return "sm"; // sm: default
        };

        const handleResize = () => {
            setBreakpoint(getBreakpoint());
        };

        // Set initial state
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return breakpoint;
}
