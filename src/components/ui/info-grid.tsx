interface InfoGridProps {
    children: React.ReactNode;
}

export function InfoGrid({ children }: InfoGridProps) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {children}
        </div>
    );
}
