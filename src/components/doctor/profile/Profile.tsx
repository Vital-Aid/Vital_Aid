// "use client";

// import React from "react";
// import { Box } from "@mui/material";
// import { useDoctorProfile } from "@/lib/Query/hooks/useDoctorProfile";

// import MoreDetailes from "./moredetailes";
// import DoctorProfile, { DoctorDetails } from "./doctorProfile";


// const Profile = () => {
//     const { data } = useDoctorProfile();
//     const doctor: DoctorDetails = data?.data;
    

//     return (
//         <Box sx={{ width: "fit", display: "flex", flexDirection: "column", alignItems: "center", p: 2,marginLeft:"125px" }}>
//             {doctor && <DoctorProfile doctor={doctor}  />}
//             <MoreDetailes doctor={doctor} />
//         </Box>
//     );
// };

// export default Profile;
"use client"
import React from "react";
import { Box } from "@mui/material";
import { useDoctorProfile } from "@/lib/Query/hooks/useDoctorProfile";

import MoreDetailes from "./moredetailes";
import DoctorProfile, { DoctorDetails } from "./doctorProfile";

const Profile = () => {
    const { data } = useDoctorProfile();
    const doctor: DoctorDetails = data?.data;

    return (
        <Box sx={{ 
            
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            p: 2, 
            ml: { xs: 0, sm: "260px" } 
        }}>
            {doctor && <DoctorProfile doctor={doctor} />}
            <MoreDetailes doctor={doctor} />
        </Box>
    );
};

export default Profile;
