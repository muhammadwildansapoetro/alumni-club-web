"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth.store";
import { TDepartment } from "@/types/alumni";
import { SquarePenIcon } from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuthStore();

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{user?.profile?.fullName} </CardTitle>
                    <Badge size={"md"} variant={user?.profile?.department as keyof typeof TDepartment} className="-mt-1">
                        {user?.profile?.department ? TDepartment[user.profile.department as keyof typeof TDepartment] : "-"}{" "}
                        {user?.profile?.classYear}
                    </Badge>
                    <CardDescription>Bio</CardDescription>
                    <CardAction className={buttonVariants()}>
                        <SquarePenIcon />
                        Ubah
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p>{user?.profile?.jobTitle ?? "-"}</p>
                    <p>{user?.profile?.companyName ?? "-"}</p>
                    <p>{user?.profile?.employmentLevel ?? "-"}</p>
                    <p>{user?.profile?.industry ?? "-"}</p>
                </CardContent>
            </Card>
        </div>
    );
}
