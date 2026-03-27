import { Loading } from "@/components/ui/loading";

export default function StatisticLoading() {
    return (
        <div className="container mx-auto flex min-h-screen items-center justify-center p-6">
            <Loading size="lg" />
        </div>
    );
}
