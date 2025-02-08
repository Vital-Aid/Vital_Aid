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

interface AddReportModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reportData: ReportData) => void;
}

interface ReportData {
  height: string;
  weight: string;
  pressureRate: string;
  sugarRate: string;
  cholesterol: string;
  healthStatus: string;
  allergies: string;
  otherDiseases: string;
  aboutYou: string;
}

const AddReportModal: React.FC<AddReportModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [reportData, setReportData] = useState<ReportData>({
    height: "",
    weight: "",
    pressureRate: "",
    sugarRate: "",
    cholesterol: "",
    healthStatus: "",
    allergies: "",
    otherDiseases: "",
    aboutYou: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(reportData);
    setReportData({
      height: "",
      weight: "",
      pressureRate: "",
      sugarRate: "",
      cholesterol: "",
      healthStatus: "",
      allergies: "",
      otherDiseases: "",
      aboutYou: "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Medical Report</DialogTitle>
      <DialogContent>
        <div className="flex justify-between gap-3">
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
            label="Current Health Status"
            name="healthStatus"
            variant="outlined"
            value={reportData.healthStatus}
            onChange={handleChange}
            margin="dense"
          />
        </div>
        <div className="flex justify-between gap-3">
          <TextField
            fullWidth
            label="Allergies"
            name="allergies"
            variant="outlined"
            value={reportData.allergies}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Other Diseases"
            name="otherDiseases"
            variant="outlined"
            value={reportData.otherDiseases}
            onChange={handleChange}
            margin="dense"
          />
        </div>
        <TextField
          fullWidth
          label="About You"
          name="aboutYou"
          variant="outlined"
          value={reportData.aboutYou}
          onChange={handleChange}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReportModal;
