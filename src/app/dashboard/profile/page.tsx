import { getOwnProfile } from "@/server/profile.server";
import ProfileClient from "./client";

export default async function ProfilePage() {
    const user = await getOwnProfile();

    return <ProfileClient user={user} />;
}
