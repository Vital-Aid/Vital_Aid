"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import { useDoctorProfile } from "@/lib/Query/hooks/useDoctorProfile";

import MoreDetailes from "./moredetailes";
import DoctorProfile, { DoctorDetails } from "./doctorProfile";

const Profile = () => {
    const { isLoading, data } = useDoctorProfile();
    const doctor: DoctorDetails = data?.data;
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
            {doctor && <DoctorProfile doctor={doctor}  />}
            <MoreDetailes onEdit={handleEditClick}/>
        </Box>
    );
};

export default Profile;
