import FeatureUnderConstruction from "@/components/feature-under-construction";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOwnProfile } from "@/server/profile.server";
import { departmentBorderMap } from "@/types/user";
import { HandshakeIcon, PlusIcon } from "lucide-react";

export default async function ProfileBusinessPage() {
    const user = await getOwnProfile();
    const deptStyle = departmentBorderMap[user?.profile?.department as keyof typeof departmentBorderMap];

    return (
        <>
            <FeatureUnderConstruction />

            <Card className={deptStyle?.firstCard}>
                <CardHeader className={deptStyle?.header}>
                    <CardTitle className="flex items-center gap-1 text-lg sm:text-xl">
                        <HandshakeIcon /> Bisnis
                    </CardTitle>
                    <CardAction className={buttonVariants({ variant: "outline" })}>
                        <PlusIcon />
                        Tambah
                    </CardAction>
                </CardHeader>
                <CardContent>Daftar bisnis</CardContent>
            </Card>
        </>
    );
}
