interface InfoItemProps {
    label: string;
    value?: React.ReactNode;
}

export function InfoItem({ label, value }: InfoItemProps) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <div className="font-medium">{value ?? "-"}</div>
        </div>
    );
}
