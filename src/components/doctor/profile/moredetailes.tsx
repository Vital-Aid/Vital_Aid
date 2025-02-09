"use client";

import React, { useState } from "react";
import { Box, Card, Typography, TextField, Button, Grid} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import { Dayjs } from "dayjs";
import { useDoctorSlots } from "@/lib/Query/hooks/useDoctorProfile";

interface MoreDetailesProps {
    onEdit: () => void;
}

export interface Appointment {
    _id: string;
    doctor: string;
    date: string;
    time: string;
    place: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const MoreDetailes: React.FC<MoreDetailesProps> = ({ onEdit }) => {
    // State for form fields
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
    const [place, setPlace] = useState<string>("");

    // Fetch doctor slots
    const { data,refetch } = useDoctorSlots();
    const slots: Appointment[] = data?.data || [];

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        const slotData = {
            date: selectedDate?.format("DD-MM-YYYY"), 
            time: selectedTime?.format("hh:mm A"),
            place: place
        };

        try {
            await axiosInstance.post('/doctors/addslot', slotData);
            refetch()
        } catch (error) {
            axiosErrorManager(error);
            console.log(error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Card sx={{ p: 4, boxShadow: 4, borderRadius: 3, mt: 4, width: "100%", maxWidth: "900px" }}>
                
               
               

                {/* Display Slots */}
                <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "green" }}>
                    Available Slots
                </Typography>

                <Grid container spacing={2}>
                    {slots.length > 0 ? (
                        slots.map((slot) => (
                            <Grid item xs={12} sm={4} key={slot._id}>
                                <Card sx={{ p: 2, textAlign: "center", boxShadow: 2, borderRadius: 2 }}>
                                    <Typography variant="body1"><b>Place:</b> {slot.place}</Typography>
                                    <Typography variant="body1"><b>Date:</b> {slot.date}</Typography>
                                    <Typography variant="body1"><b>Time:</b> {slot.time}</Typography>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ ml: 2, color: "gray" }}>No slots available.</Typography>
                    )}
                </Grid>

                {/* Add Slots Section */}
                <Typography variant="h5" sx={{ mt: 4, mb: 3, fontWeight: "bold", color: "green" }}>
                    Add Slots
                </Typography>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} alignItems="center">
                        {/* Date Picker */}
                        <Grid item xs={12} sm={4}>
                            <DatePicker
                                label="Select Date"
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                slotProps={{ textField: { fullWidth: true } }}
                            />
                        </Grid>

                        {/* Time Picker */}
                        <Grid item xs={12} sm={4}>
                            <TimePicker
                                label="Select Time"
                                value={selectedTime}
                                onChange={(newValue) => setSelectedTime(newValue)}
                                slotProps={{ textField: { fullWidth: true } }}
                            />
                        </Grid>

                        {/* Place Input */}
                        <Grid item xs={12} sm={4}>
                            <TextField 
                                fullWidth 
                                label="Enter the Place" 
                                value={place} 
                                onChange={(e) => setPlace(e.target.value)}
                            />
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12} sm={4}>
                            <Button variant="contained" color="success" fullWidth type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Card>
        </LocalizationProvider>
    );
};

export default MoreDetailes;
