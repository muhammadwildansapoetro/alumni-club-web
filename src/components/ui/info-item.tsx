interface InfoItemProps {
    label: string;
    value?: React.ReactNode;
}

export function InfoItem({ label, value }: InfoItemProps) {
    return (
        <div>
            <p className="text-xs text-gray-700">{label}</p>
            <div className="font-semibold">{value ?? "-"}</div>
        </div>
    );
}
