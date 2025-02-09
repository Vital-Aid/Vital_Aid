"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axiosInstance from "@/utils/axios";
import { useAppSelector } from "@/lib/store/hooks";

interface AddReportModalProps {
  open: boolean;
  onClose: () => void;
}

interface ReportData {
  userid: string | null,
  age: string;
  name: string;
  height: string;
  weight: string;
  pressureRate: string;
  sugarRate: string;
  cholesterol: string;
  allergies: string;
  otherDiseases: string;
  aboutYou: string;
}

const AddReportModal: React.FC<AddReportModalProps> = ({ open, onClose }) => {
  const { user } = useAppSelector((state) => state.auth);

  const [reportData, setReportData] = useState<ReportData>({
    userid: user?.id ?? null,
    name: "",
    age: "",
    height: "",
    weight: "",
    pressureRate: "",
    sugarRate: "",
    cholesterol: "",
    allergies: "",
    otherDiseases: "",
    aboutYou: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReportData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value, // Convert age to a number
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("users/generatereport", reportData);
      console.log("Report Submitted:", response?.data?.report);




      setReportData({
        userid: user?.id ?? null,
        name: "",
        age: "",
        height: "",
        weight: "",
        pressureRate: "",
        sugarRate: "",
        cholesterol: "",
        allergies: "",
        otherDiseases: "",
        aboutYou: "",
      });

      onClose();
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Medical Report</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          name="name"
          variant="outlined"
          value={reportData.name}
          onChange={handleChange}
          margin="dense"
        />
        <div className="flex justify-between gap-3">
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number" // Ensure age input is numeric
            variant="outlined"
            value={reportData.age}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Height"
            name="height"
            variant="outlined"
            value={reportData.height}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Weight"
            name="weight"
            variant="outlined"
            value={reportData.weight}
            onChange={handleChange}
            margin="dense"
          />
        </div>
        <div className="flex justify-between gap-3">
          <TextField
            fullWidth
            label="Pressure Rate"
            name="pressureRate"
            variant="outlined"
            value={reportData.pressureRate}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Sugar Rate"
            name="sugarRate"
            variant="outlined"
            value={reportData.sugarRate}
            onChange={handleChange}
            margin="dense"
          />
        </div>
        <div className="flex justify-between gap-3">
          <TextField
            fullWidth
            label="Cholesterol"
            name="cholesterol"
            variant="outlined"
            value={reportData.cholesterol}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Allergies"
            name="allergies"
            variant="outlined"
            value={reportData.allergies}
            onChange={handleChange}
            margin="dense"
          />
        </div>

        <TextField
          fullWidth
          label="Other Diseases"
          name="otherDiseases"
          variant="outlined"
          value={reportData.otherDiseases}
          onChange={handleChange}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Assess the Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReportModal;
