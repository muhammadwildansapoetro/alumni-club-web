import { Loading } from "@/components/ui/loading";

export default function RootLoading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <Loading size="lg" />
        </div>
    );
}
