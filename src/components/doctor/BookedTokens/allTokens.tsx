
'use client'

import { editToken, useAlltokenofeachdoctors } from '@/lib/Query/hooks/addToken'
import React, { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import {
  Box, Typography, CardContent, Card, CircularProgress
} from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Token } from '@/components/users/Token/addToken'
import Image from 'next/image'
import { socket } from '@/lib/socket/socketinstanc'



const AllTokens = () => {
  const today = dayjs();
  const [date, setDate] = useState<Dayjs | null>(today);
  const { data, refetch, isLoading, isError } = useAlltokenofeachdoctors(date?.format('DD-MM-YYYY') || today.format('DD-MM-YYYY'));


  useEffect(() => {
    const handleTokenUpdate = () => {
      console.log("Received tokenUpdated or otpVerified event");
      refetch();
    };
  
    socket.on("tokenUpdated", handleTokenUpdate);
    socket.on("otpVerified", handleTokenUpdate);
  
    return () => {
      socket.off("tokenUpdated", handleTokenUpdate);
      socket.off("otpVerified", handleTokenUpdate);
    };
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
                sx: { width: "40%" }
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
              position: "relative", // Add this line
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
            <Box sx={{ display: "flex", width: "100%" }}>
              {/* Status Dropdown - Positioned Top-Right */}
              <select
                id="status"
                value={appointment.status}
                onChange={(e) => {
                  if (e.target.value !== "Edit status") {
                    editToken(appointment._id, e.target.value, refetch);
                  }
                }}
                style={{
                  position: "absolute", // Position it absolutely
                  top: 10, // Adjust the top margin
                  right: 10, // Adjust the right margin
                  zIndex: 1, // Ensure it's above the content
                }}
              >
                <option value="Edit status">Edit status</option>
                <option value="Completed">Completed</option>
              </select>

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
                <Typography
                  variant="body1"
                  sx={{
                    color: appointment.status === "Completed" ? "green" :
                      appointment.status === "cancelled" ? "red" :
                        appointment.status === "pending" ? "yellow" : "inherit"
                  }}
                >
                  <strong>Status:</strong> {appointment.status || "N/A"}
                </Typography>
                <Typography variant="body1" color="primary">
                  <strong>Phone:</strong> {appointment.patientId?.phone || "N/A"}
                </Typography>
              </CardContent>
            </Box>
          </Card>


        ))
      ) : (
        <Typography textAlign="center">No appointments found for this date.</Typography>
      )}
    </Box>
  );
};

export default AllTokens;
