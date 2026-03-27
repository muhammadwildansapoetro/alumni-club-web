"use client";

import EditProfileDialog from "./edit-profile";
import ChangePasswordDialog from "./change-password";
import FurtherEducationManagementDialog from "./further-education-management";
import WorkExperienceManagementDialog from "./work-experience-management";
import JobManagementDialog from "./job-management";
import BusinessManagementDialog from "./business-management";
import BusinessDetailDialog from "./business-detail";

export default function DialogProvider() {
    return (
        <>
            <EditProfileDialog />
            <ChangePasswordDialog />
            <FurtherEducationManagementDialog />
            <WorkExperienceManagementDialog />
            <JobManagementDialog />
            <BusinessManagementDialog />
            <BusinessDetailDialog />
        </>
    );
}
