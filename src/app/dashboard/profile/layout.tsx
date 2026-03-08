import ProfileTabNav from "./tab-nav";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <ProfileTabNav />
            {children}
        </div>
    );
}
