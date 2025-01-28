"use client";

import React, { useState } from "react";
import {
  Card,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Sidebar = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (panel: number) => {
    setOpen(open === panel ? null : panel);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-transparent text-gray-500 p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoClose size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-sky-50 dark:bg-gray-900 border-r border-gray-200 shadow-md transform transition-transform duration-300 z-40 w-64 flex flex-col h-screen ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <Card
          sx={{
            height: "100vh",
            padding: 2,
            boxShadow: 3,
            bgcolor: "background.paper",
          }}
        >
          {/* Sidebar Header */}
          <div style={{ marginBottom: "1rem", padding: "1rem" }}>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              Admin Panel
            </Typography>
          </div>

          {/* Sidebar Content */}
          <List>
            <Accordion expanded={open === 1} onChange={() => handleOpen(1)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <Typography>Listings</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <Link
                    href="/Admin-listing"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemText primary="Active Listings" />
                    </ListItemButton>
                  </Link>
                  <Link
                    href="/Admin-pendinglist"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemText primary="Pending Approvals" />
                    </ListItemButton>
                  </Link>
                  <Link
                    href="/Create-listing"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton>
                      <ListItemText primary="Create New" />
                    </ListItemButton>
                  </Link>
                </List>
              </AccordionDetails>
            </Accordion>
          </List>
        </Card>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
