"use client";

import EditProfileDialog from "./edit-profile";
import ChangePasswordDialog from "./change-password";
import FurtherEducationManagementDialog from "./further-education-management";
import WorkExperienceManagementDialog from "./work-experience-management";
import JobManagementDialog from "./job-management";

export default function DialogProvider() {
    return (
        <>
            <EditProfileDialog />
            <ChangePasswordDialog />
            <FurtherEducationManagementDialog />
            <WorkExperienceManagementDialog />
            <JobManagementDialog />
        </>
    );
}
