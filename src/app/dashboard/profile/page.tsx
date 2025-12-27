import { getOwnProfile } from "@/server/profile.server";
import ProfileClient from "./client";

export default async function ProfilePage() {
    const profile = await getOwnProfile();

    return <ProfileClient initialProfile={profile} />;
}
