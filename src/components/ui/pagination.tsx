import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const getVisiblePages = () => {
        const delta = 2;
        const range: number[] = [];
        const rangeWithDots: (number | string)[] = [];
        let l: number | undefined;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        range.forEach((i) => {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            l = i;
        });

        return rangeWithDots;
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="hidden sm:flex">
                <ChevronLeftIcon className="h-4 w-4" />
                Previous
            </Button>

            <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="sm:hidden">
                <ChevronLeftIcon className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-1">
                {getVisiblePages().map((page, index) => (
                    <span key={index}>
                        {page === "..." ? (
                            <span className="px-3 py-1 text-sm">...</span>
                        ) : (
                            <Button
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => onPageChange(page as number)}
                                className="min-w-10"
                            >
                                {page}
                            </Button>
                        )}
                    </span>
                ))}
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="hidden sm:flex"
            >
                Next
                <ChevronRightIcon className="h-4 w-4" />
            </Button>

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="sm:hidden"
            >
                <ChevronRightIcon className="h-4 w-4" />
            </Button>
        </div>
    );
}
