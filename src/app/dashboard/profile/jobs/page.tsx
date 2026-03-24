import FeatureUnderConstruction from "@/components/feature-under-construction";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseIcon, PlusIcon } from "lucide-react";

export default async function ProfileJobsPage() {
    return (
        <>
            <FeatureUnderConstruction />

            <Card className="border-primary border-t-8">
                <CardHeader className="border-primary/50 border-b">
                    <CardTitle className="flex items-center gap-1 text-lg sm:text-xl">
                        <BriefcaseIcon />
                        Lowongan Pekerjaan
                    </CardTitle>
                    <CardAction className={buttonVariants({ variant: "outline" })}>
                        <PlusIcon />
                        Tambah
                    </CardAction>
                </CardHeader>
                <CardContent>Daftar Lowongan pekerjaan</CardContent>
            </Card>
        </>
    );
}
