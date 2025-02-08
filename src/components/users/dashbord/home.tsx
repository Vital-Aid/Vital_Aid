"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, Button, Card, CardContent, CardHeader } from "@mui/material";
import {
  FaClock,
  FaHeart,
  FaMapPin,
  FaPhone,
  FaStethoscope,
  FaUser,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { useAppSelector } from "@/lib/store/hooks";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import AddReportModal from "@/components/ui/addDetail";

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [udetails, setUdetails] = useState<usdetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reports, setReports] = useState<string[]>(["Week 1 Report", "Week 2 Report"]);

  type usdetails = {
    age: number;
    gender: string;
    bloodgroup: string;
    occupation: string;
    address: string;
  };
  const handleAddReport = (reportName: string) => {
    setReports([...reports, reportName]);
    setIsModalOpen(false);
  };

  console.log(user);

  useEffect(() => {
    const fetchdetails = async () => {
      try {
        const details = await axiosInstance.get(
          `/users/getdetails/${user?.id}`
        );
        setUdetails(details.data[0]);
      } catch (error) {
        axiosErrorManager(error);
      }
    };
    fetchdetails();
  }, [user]);

  return (
    <div className="w-full mx-auto p-6 space-y-8 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-72 bg-white shadow-lg rounded-lg p-6 hidden sm:block">
          <h2 className="text-xl font-bold text-gray-800">
            Welcome, {user?.name}
          </h2>
          <h3 className="font-medium text-gray-600 mt-4">Quick Actions</h3>
          <div className="space-y-3 mt-4">
            <Button
              variant="contained"
              className="w-full flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white py-2"
            >
              <FaHeart className="w-5 h-5" /> Request Blood
            </Button>
            <Button
              variant="contained"
              className="w-full flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white py-2"
            >
              <FaUser className="w-5 h-5" /> Request Medical Equipment
            </Button>
            <Button
              variant="contained"
              className="w-full flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white py-2"
            >
              <FaStethoscope className="w-5 h-5" /> Consult a Doctor
            </Button>
            <Button
              variant="contained"
              className="w-full flex items-center gap-3 bg-purple-500 hover:bg-purple-600 text-white py-2"
            >
              <FaUser className="w-5 h-5" /> View our donors
            </Button>
          </div>
        </div>

        <div className="flex-1 space-y-6 pb-16 sm:pb-0">
          <div className="flex items-center justify-between bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-40 w-40 shadow-lg">
                <Image
                  src={
                    user?.profileImage?.originalProfile ||
                    "https://i.pinimg.com/736x/ed/fe/67/edfe6702e44cfd7715a92390c7d8a418.jpg"
                  }
                  width={300}
                  height={300}
                  alt="Profile Image"
                  className="rounded-full"
                />
              </Avatar>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-green-600">
                  {user?.name}
                </h2>
                <div className="space-y-1 text-gray-600 text-sm">
                  <p className="flex items-center gap-2">
                    <FaClock className="h-4 w-4" /> {udetails?.age || "18"} |
                    Occupation:{udetails?.occupation || "none"}
                  </p>
                  <p className="flex items-center gap-2">
                    <FiMail className="h-4 w-4" /> {user?.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhone className="h-4 w-4" /> {user?.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapPin className="h-4 w-4" />{" "}
                    {udetails?.address || "none"}
                  </p>
                  <Button variant="text" color="warning">
                    edit
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <div className="flex justify-between m-2 ">
                <CardHeader
                  title={
                    <h3 className="text-lg font-semibold ">Medical Report</h3>
                  }
                />
                <Button
                  variant="text"
                  color="primary"
                  className="h-10  text-white"
                  onClick={() => setIsModalOpen(true)}
                >
                  + Add report
                </Button>
              </div>

              <CardContent className="space-y-2">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="h-10 bg-green-100 rounded p-2 shadow-sm"
                  >
                    Week {index + 1} Report
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <div className="flex justify-between m-2 ">
                
                <CardHeader
                  title={
                    <h3 className="text-lg font-semibold">appoiment history</h3>
                  }
                />
                <Button variant="text" color="primary">
                  + Add Appointment
                </Button>
              </div>

              <CardContent className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  View with doctor
                </div>
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  View with doctor
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg">
            <CardHeader
              title={<h3 className="text-lg font-semibold">Notifications</h3>}
            />
            <CardContent className="space-y-2">
              <div className="h-12 bg-gray-50 rounded shadow-sm"></div>
              <div className="h-12 bg-gray-50 rounded shadow-sm"></div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader
              title={
                <h3 className="text-lg font-semibold">Review from doctor</h3>
              }
            />
            <CardContent className="space-y-2">
              <div className="h-12 bg-gray-50 rounded shadow-sm"></div>
              <div className="h-12 bg-gray-50 rounded shadow-sm"></div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-4 flex justify-around items-center sm:hidden">
        <Button
          variant="contained"
          className="flex flex-col items-center gap-1 bg-red-500 hover:bg-red-600 text-white py-2"
        >
          <FaHeart className="w-5 h-5" />
          <span className="text-xs">Blood</span>
        </Button>
        <Button
          variant="contained"
          className="flex flex-col items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white py-2"
        >
          <FaUser className="w-5 h-5" />
          <span className="text-xs">Equipment</span>
        </Button>
        <Button
          variant="contained"
          className="flex flex-col items-center gap-1 bg-green-500 hover:bg-green-600 text-white py-2"
        >
          <FaStethoscope className="w-5 h-5" />
          <span className="text-xs">Doctor</span>
        </Button>
        <Button
          variant="contained"
          className="flex flex-col items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white py-2"
        >
          <FaUser className="w-5 h-5" />
          <span className="text-xs">Donors</span>
        </Button>
      </div>
      <AddReportModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddReport} />
    </div>
  );
};

export default Home;
