"use client"
import React, { useState } from 'react'
import { Box, Button, Typography,Avatar } from "@mui/material";
import dayjs from "dayjs";
import { useDoctorbyId } from '@/lib/Query/hooks/doctorById';
import { useParams } from 'next/navigation';

const AddToken = () => {
    const today=dayjs()
    const daysInMonth=today.daysInMonth()
    const [selectedDate,setSelectedDate]=useState<number|null>(null)
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    console.log("selecteddate:",selectedDate);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const{id}=useParams()
  const{data}=useDoctorbyId(id)
    console.log("dta:",data);
    
    const slots = [
      "11:30 am", "12:00 pm", "12:30 pm", "01:00 pm", "01:30 pm", "02:00 pm",
      "02:30 pm", "03:00 pm", "03:30 pm", "04:00 pm", "04:30 pm", "05:00 pm",
      "05:30 pm", "06:00 pm"
    ];
  return (
    <div className='w-screen'>
    <Box p={3} sx={{ maxWidth: 900, margin: "auto", bgcolor: "#f9f9f9", borderRadius: 2,boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", }}>
    {/* Date Picker */}
    <Box display="flex" gap={1} overflow="auto" p={1} sx={{
  scrollbarWidth: "thin",
  scrollbarColor: "darkgray pink", // Light green thumb, pink track
  "&::-webkit-scrollbar": {
    height: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "darkgray", // ✅ Light green thumb
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "pink", // ✅ Pink track
  },
}}>
      {days.map((day) => (
        <Box
          key={day}
          onClick={() => setSelectedDate(day)}
          sx={{
            minWidth: 50,
            height: 70,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            cursor: "pointer",
            backgroundColor: selectedDate === day ? "green" : "#A5B79B",
            color: selectedDate === day ? "white" : "black",
            transition: "0.3s",
          }}
        >
          <Typography fontWeight="bold">{day}</Typography>
          <Typography fontSize={12}>{today.format("MMM")}</Typography>
        </Box>
      ))}
    </Box>

   {/* Doctor Profile */}
<Box 
  display="flex" 
  alignItems="center" 
  mt={3} 
  gap={2} 
  justifyContent="center" // ✅ Center horizontally
>
  <Avatar
    src="/doctor.jpg"
    sx={{ width: 150, height: 150, border: "2px solid gray" }}
  />
  <Box textAlign="center"> {/* ✅ Center text inside */}
    <Typography variant="h6" fontWeight="bold">Dr. John Doe</Typography>
    <Typography variant="body2" color="gray">
      Senior Consultant - Neurology
    </Typography>
    <Typography variant="body2" color="gray">
      Specialist in Epilepsy and Movement Disorders
    </Typography>
    <Typography variant="body2" color="gray">
      City Care Hospital
    </Typography>
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
    <Box mt={3}>
      <Typography fontWeight="bold" color="green">
        Available Slots
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={1} mt={2}>
        {slots.map((slot) => (
          <Button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            variant={selectedSlot === slot ? "contained" : "outlined"}
            sx={{
              backgroundColor: selectedSlot === slot ? "green" : "#D4E6B5",
              color: selectedSlot === slot ? "white" : "black",
              borderRadius: 2,
              textTransform: "none",
              "&:hover": { backgroundColor: "green", color: "white" },
            }}
          >
            {slot}
          </Button>
        ))}
      </Box>
    </Box>

    {/* Confirm Button */}
    <Box display="flex" justifyContent="center" mt={3}>
      <Button
        variant="contained"
        color="success"
        sx={{ px: 5, py: 1.5, borderRadius: 2 }}
        disabled={!selectedSlot}
      >
        Confirm
      </Button>
    </Box>
  </Box>
  </div>
  )
}

export default AddToken
