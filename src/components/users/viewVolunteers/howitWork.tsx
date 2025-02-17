import React, { JSX } from "react";
import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';


interface StepType {
  label: string;
  icon: JSX.Element;
}

const steps: StepType[] = [
  { label: "Browse our volunteers.", icon: <ContentPasteSearchIcon /> },
  { label: "You can easily reach out to donors and Contact them directly..", icon: <LocalPhoneOutlinedIcon /> },
  { label: "Get the support you need..", icon: <ContactPhoneOutlinedIcon /> },
 
];

const HowItWorks: React.FC = () => {
  return (
    <div>
      <Box sx={{ width: "100%", textAlign: "center", my: 2, p: 3, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        Volunteers Support
      </Typography>
     
      <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
      Need a volunteer? Here is a list of volunteers ready to help. Browse,
      connect, and seek help!
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
      This list features volunteers who are ready to help you in times of
      need.Together, we can save lives! 💖<br/> Here is how you can use this information:
      </Typography>
    </Box>
    <Box sx={{ width: "100%", textAlign: "center", py: 4,boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.1) "}}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        How it Works
      </Typography>
      <Stepper alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index} sx={{ color: "black", "& .MuiStepLabel-label": { color: "black" } }}>
            <StepLabel icon={step.icon}>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    </div>
  );
};

export default HowItWorks;