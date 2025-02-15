// 'use client'
// import { useAlltokenofeachdoctors } from '@/lib/Query/hooks/addToken'
// import React, { useEffect, useState } from 'react'
// import { io } from 'socket.io-client'
// import dayjs from 'dayjs'
// import { Box, Typography, CardContent, Card, CircularProgress } from '@mui/material'
// import { Token } from '@/components/users/Token/addToken'

// const socket = io("http://localhost:5000");

// const AllTokens = () => {
//   const today = dayjs().format('DD-MM-YYYY');
//   const [date, setDate] = useState<string>(today);
//   const { data, refetch, isLoading, isError } = useAlltokenofeachdoctors(date);

//   useEffect(() => {
//     const handleTokenUpdate = () => {
//       refetch(); 
//     };

//     socket.on("tokenUpdated", handleTokenUpdate);

//     return () => {
//       socket.off("tokenUpdated", handleTokenUpdate); 
//     };
//   }, [refetch]);

//   const tokens: Token[] = data?.data || [];

//   return (
//     <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
//       <Typography variant="h6" color="primary" fontWeight="bold" mb={2}>
//         Today&apos;s Waiting Appointments
//       </Typography>

//       {isLoading ? (
//         <Box display="flex" justifyContent="center" alignItems="center" height={100}>
//           <CircularProgress color="primary" />
//         </Box>
//       ) : isError ? (
//         <Typography color="error">Failed to load appointments.</Typography>
//       ) : tokens.length > 0 ? (
//         tokens.map((appointment, index) => (
//           <Card
//             key={index}
//             sx={{
//               mb: 2,
//               backgroundColor: "#E3F2FD",
//               borderRadius: 2,
//               transition: "0.3s",
//               '&:hover': { backgroundColor: "#BBDEFB", transform: "scale(1.02)" }
//             }}
//           >
//             <CardContent>
//               <Typography variant="body1">
//                 <strong>Patient Name:</strong> {appointment.patientId?.name || "N/A"}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Date:</strong> {appointment.date || "N/A"}
//               </Typography>
//               <Typography variant="body1" color="primary">
//                 <strong>Phone Number:</strong> {appointment.patientId?.phone || "N/A"}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))
//       ) : (
//         <Typography>No waiting appointments found.</Typography>
//       )}
//     </Box>
//   );
// };

// export default AllTokens;
'use client'

import { useAlltokenofeachdoctors } from '@/lib/Query/hooks/addToken'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import dayjs, { Dayjs } from 'dayjs'
import { 
  Box, Typography, CardContent, Card, CircularProgress 
} from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Token } from '@/components/users/Token/addToken'
import Image from 'next/image'

const socket = io("http://localhost:5000");

const AllTokens = () => {
  const today = dayjs();
  const [date, setDate] = useState<Dayjs | null>(today);
  const { data, refetch, isLoading, isError } = useAlltokenofeachdoctors(date?.format('DD-MM-YYYY') || today.format('DD-MM-YYYY'));
console.log("today",today);

  useEffect(() => {
    const handleTokenUpdate = () => refetch();
    socket.on("tokenUpdated", handleTokenUpdate);
    return () => socket.off("tokenUpdated", handleTokenUpdate);
  }, [refetch]);

  const tokens: Token[] = data?.data || [];

  return (
    <Box 
      sx={{
        maxWidth: 800,
        margin: "auto",
        mt: 4,
        p: 2,
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#ffffff"
      }}
    >
      <Typography variant="h6" color="primary" fontWeight="bold" mb={2} textAlign="center">
      {date?.format("DD-MM-YYYY") === today.format("DD-MM-YYYY") 
  ? `Today's Waiting Appointments` 
  : 'Appointments by Date'}
      </Typography>

      {/* Date Picker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
    <DatePicker
      label="Select Date"
      value={date}
      onChange={(newDate) => setDate(newDate)}
      slotProps={{
        textField: { 
          sx: { width: "40%" } // Ensures proper styling
        } 
      }}
    />
  </Box>
</LocalizationProvider>

      {isLoading ? (
        <Box 
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 100
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : isError ? (
        <Typography color="error" textAlign="center">Failed to load appointments.</Typography>
      ) : tokens.length > 0 ? (
        tokens.map((appointment, index) => (
          <Card
            key={index}
            sx={{
              mb: 2,
              backgroundColor: "#E3F2FD",
              borderRadius: 2,
              transition: "0.3s",
              p: 2,
              display: "flex",
              alignItems: "center",
              minHeight: 100,
              '&:hover': {
                backgroundColor: "#BBDEFB",
                transform: "scale(1.02)",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.2)"
              }
            }}
          >
            {/* Profile Image */}
            {appointment.patientId?.profileImage?.originalProfile && (
              <Box 
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  overflow: "hidden",
                  mr: 2,
                  flexShrink: 0
                }}
              >
                <Image
                  src={appointment.patientId.profileImage.originalProfile}
                  alt="Profile Image"
                  width={60}
                  height={60}
                />
              </Box>
            )}

            {/* Appointment Details (Centered Vertically) */}
            <CardContent 
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flex: 1,
                height: "100%"
              }}
            >
              <Typography variant="body1">
                <strong>Patient Name:</strong> {appointment.patientId?.name || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Token Number:</strong> {appointment.tokenNumber || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {appointment.status || "N/A"}
              </Typography>
              <Typography variant="body1" color="primary">
                <strong>Phone:</strong> {appointment.patientId?.phone || "N/A"}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography textAlign="center">No appointments found for this date.</Typography>
      )}
    </Box>
  );
};

export default AllTokens;
