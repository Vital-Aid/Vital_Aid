

"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { useDoctobyId } from "@/lib/Query/hooks/useDocterUser";
import { useParams } from "next/navigation";
import { useDoctorSlots } from "@/lib/Query/hooks/useDoctorProfile";
import { addToken, useAlltoken } from "@/lib/Query/hooks/addToken";

interface DoctorInfo {
  email: string;
  name: string;
  phone: string;
  _id: string;
}

interface DoctorData {
  description: string;
  doctor: DoctorInfo;
  profileImage: string;
  qualification: string[];
  specialization: string[];
  hospital: string;
  address: string;
}
export interface Token {
  _id: string;
  patientId: string;
  doctorId: string;
  date: string;
  status?: "pending" | "cancelled" | "Completed";
  tokenNumber: number;
}


const AddToken = () => {
  const { id } = useParams();
  const { data } = useDoctobyId(id as string);
  const { data: totalToken } = useDoctorSlots(id as string);
  const { data: allToken, refetch } = useAlltoken()


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const today = dayjs();
  const daysInMonth = today.daysInMonth();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);


  const doctor: DoctorData = data?.data[0];
  const totalslots = totalToken?.data?.tokenPerDay;
  const AllToken: Token[] = allToken?.data
  console.log("alltoken", AllToken);

  const slots = [];
  for (let i = 1; i <= totalslots; i++) {
    slots.push(i);
  }

  const handleDateClick = (day: number) => {
    const formattedDate = today.date(day).format("DD/MM/YYYY");
    setSelectedDate(formattedDate);
  };


  const datas = { date: selectedDate, tokenNumber: selectedSlot, doctorId: doctor?.doctor?._id }

const handleSubmit=(datas:object)=>{
  addToken(datas)
 
}

  return (
    <div className="w-screen mt-10">
      <Box
        p={2}
        sx={{
          maxWidth: isMobile ? "90%" : 850,
          margin: "auto",
          bgcolor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          minHeight: isMobile ? 600 : "auto", // Increased height for mobile
        }}
      >
        {/* Date Picker */}
        <Box
          display="flex"
          gap={1}
          overflow="auto"
          p={1}
          sx={{
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": { height: "6px" },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "darkgray", borderRadius: "10px" },
            "&::-webkit-scrollbar-track": { backgroundColor: "pink" },
          }}
        >
          {days.map((day) => (
            <Box
              key={day}
              onClick={() => handleDateClick(day)}
              sx={{
                minWidth: 40,
                height: 50,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                cursor: "pointer",
                backgroundColor: selectedDate === today.date(day).format("DD/MM/YYYY") ? "green" : "#A5B79B",
                color: selectedDate === today.date(day).format("DD/MM/YYYY") ? "white" : "black",
                transition: "0.3s",
              }}
            >
              <Typography fontWeight="bold" fontSize={14}>{day}</Typography>
              <Typography fontSize={10}>{today.format("MMM")}</Typography>
            </Box>
          ))}
        </Box>

        {/* Doctor Profile */}
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          alignItems="center"
          mt={5}
          gap={2}
          justifyContent="center"
          textAlign={isMobile ? "center" : "left"}
        >
          <Avatar
            src={doctor?.profileImage || "/doctor.jpg"}
            sx={{
              width: isMobile ? 90 : 100,
              height: isMobile ? 90 : 100,
              border: "2px solid gray",
            }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold">{doctor?.doctor?.name}</Typography>
            <Typography variant="body2" color="gray">{doctor?.specialization[0]}</Typography>
            <Typography variant="body2" color="gray">{doctor?.hospital}</Typography>
            <Typography
              variant="body2"
              color="blue"
              sx={{ cursor: "pointer", textDecoration: "underline" }}
            >
              View Doctor's Profile &gt;&gt;
            </Typography>
          </Box>
        </Box>

        {/* Available Slots */}
        <Box mt={2}>
          <Typography fontWeight="bold" color="green">Available Slots</Typography>
          <Box
            display="grid"
            gridTemplateColumns={isMobile ? "repeat(4, 1fr)" : "repeat(8, 1fr)"}
            gap={1}
            mt={5}
          >
            {slots.map((slot) => {
              // Check if this slot is already booked for the selected date
              const isBooked = AllToken?.some(
                (token) => token.date === selectedDate && token.tokenNumber === slot
              );

              return (
                <Button
                  key={slot}
                  onClick={() => !isBooked && setSelectedSlot(slot)}
                  variant={selectedSlot === slot ? "contained" : "outlined"}
                  disabled={isBooked}
                  sx={{
                    backgroundColor: isBooked
                      ? "red"
                      : selectedSlot === slot
                        ? "green"
                        : "#D4E6B5",
                    color: isBooked ? "white" : selectedSlot === slot ? "white" : "black",
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: isMobile ? "8px" : "10px",
                    padding: isMobile ? "2px 3px" : "3px 4px",
                    minWidth: isMobile ? 25 : 30,
                    height: isMobile ? 25 : 30,
                    "&:hover": {
                      backgroundColor: isBooked ? "red" : "green",
                      color: "white",
                    },
                  }}
                >
                  {slot}
                </Button>
              );
            })}
          </Box>
        </Box>

        {/* Confirm Button */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="success"
            sx={{
              px: isMobile ? 3 : 4,
              py: isMobile ? 0.5 : 1,
              borderRadius: 2,
              fontSize: isMobile ? "12px" : "14px",
            }}
            disabled={!selectedSlot}
            onClick={()=>handleSubmit(datas)}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AddToken;
