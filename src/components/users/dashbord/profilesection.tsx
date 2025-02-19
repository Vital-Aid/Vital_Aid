"use client";
import { useFetchDetails } from "@/lib/Query/hooks/useReport";
import { useAppSelector } from "@/lib/store/hooks";
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import { Button, Card, Chip, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaClock, FaMapPin, FaRegAddressCard } from "react-icons/fa";
import { FiEdit, FiMail } from "react-icons/fi";
import { IoCallOutline, IoTimeOutline } from "react-icons/io5";
import { TbPhotoEdit } from "react-icons/tb";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import Image from "next/image";

type editDatas = {
  id: string;
  age: string;
  gender: string;
  bloodgroup: string;
  occupation: string;
  address: string;
  profileImage: string;
};

function Profilesection() {
  const { user } = useAppSelector((state) => state.auth);
  const { details } = useFetchDetails(user?.id ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const [editData, setEditData] = useState<editDatas | null>(null);
  const [datas, setDatas] = useState({
    age: "",
    gender: "",
    bloodgroup: "",
    occupation: "",
    address: "",
    profileImage: "",
  });
  useEffect(() => {
    if (details.length > 0) {
      setEditData({
        id: details[0]?._id,
        age: details[0]?.age ?? "",
        gender: details[0]?.gender ?? "",
        bloodgroup: details[0]?.bloodgroup ?? "",
        occupation: details[0]?.occupation ?? "",
        address: details[0]?.address ?? "",
        profileImage: details[0]?.profileImage?.originalProfile,
      });
    }
  }, [details]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const response = await axiosInstance.get(`/auth/generate-signed-url`, {
          params: { fileType: file.type },
        });
        const { signedUrl, fileName } = response.data;
        await fetch(signedUrl, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });
        const newImageUrl = `https://vitalaidnsr.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;
        await setEditData((prev) => ({
          ...prev,
          id: prev?.id ?? "",
          profileImage: newImageUrl,
          age: prev?.age ?? "",
          gender: prev?.gender ?? "",
          bloodgroup: prev?.bloodgroup ?? "",
          occupation: prev?.occupation ?? "",
          address: prev?.address ?? "",
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (details) {
      setEditData(
        (prevData) =>
          ({
            ...prevData,
            [name]: value || "",
          } as editDatas)
      );
    } else {
      setDatas((prevData) => ({
        ...prevData,
        [name]: value || "",
      }));
    }
  };
  const handleSubmit = async () => {
    try {
      if (isEditing && editData) {
        console.log("Editing Data:", editData);
        await axiosInstance.put(`/users/editdetailsofthe`, editData);
      } else if (isEditing && datas) {
        console.log("Adding New Data:", datas);
        await axiosInstance.post(`/users/addDetails/${user?.id}`, editData);
      }

      setIsEditing(false);
      setDatas({
        age: "",
        gender: "",
        bloodgroup: "",
        occupation: "",
        address: "",
        profileImage: "",
      });
      toast.success("aa");
    } catch (error) {
      axiosErrorManager(error);
    }
  };

  return (
    <>
      <Card className="shadow-xl rounded-xl overflow-hidden border-t-4 border-teal-400">
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-6">
            <div
              className="relative h-40 w-40"
              onMouseEnter={() => !isEditing && setShowProfileTooltip(true)}
              onMouseLeave={() => setShowProfileTooltip(false)}
            >
              <div
                className={`rounded-full overflow-hidden h-30 w-30  md:h-40 md:w-40 shadow-xl transition-transform duration-300 ${
                  !isEditing && "hover:scale-105"
                }`}
              >
                <Image
                  src={
                    details[0]?.profileImage?.originalProfile?.trim()
                      ? details[0]?.profileImage.originalProfile
                      : "https://i.pinimg.com/736x/ed/fe/67/edfe6702e44cfd7715a92390c7d8a418.jpg"
                  }
                  width={200}
                  height={200}
                  alt="Profile Image"
                  className={`object-cover h-full w-full ${
                    isEditing ? "blur-sm opacity-50" : ""
                  }`}
                />
              </div>

              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-20"
                  />
                  <div className="bg-white/70 rounded-full p-3 shadow-lg">
                    <TbPhotoEdit size={28} className="text-green-600 z-10" />
                  </div>
                </div>
              )}

              {showProfileTooltip && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="bg-black/60 text-white text-xs rounded px-2 py-1">
                    Click edit to change photo
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold text-green-600">
                  {user?.name}
                </h2>
                {details[0]?.bloodgroup && (
                  <Chip
                    label={details[0]?.bloodgroup}
                    size="small"
                    color="error"
                    icon={<BloodtypeIcon fontSize="small" />}
                  />
                )}
              </div>

              <div className="space-y-2 text-gray-600">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md">
                    <Input
                      name="age"
                      value={isEditing ? editData?.age : datas.age}
                      onChange={handleInputChange}
                      placeholder="Age"
                      className="bg-gray-50 px-3 py-2 rounded"
                      startAdornment={
                        <FaClock className="mr-2 text-gray-400" />
                      }
                    />
                    <Input
                      name="bloodgroup"
                      value={
                        isEditing ? editData?.bloodgroup : datas.bloodgroup
                      }
                      onChange={handleInputChange}
                      placeholder="Blood Group"
                      className="bg-gray-50 px-3 py-2 rounded"
                      startAdornment={
                        <BloodtypeIcon
                          className="mr-2 text-gray-400"
                          fontSize="small"
                        />
                      }
                    />
                    <Input
                      name="occupation"
                      value={
                        isEditing ? editData?.occupation : datas.occupation
                      }
                      onChange={handleInputChange}
                      placeholder="Occupation"
                      className="bg-gray-50 px-3 py-2 rounded"
                      startAdornment={<FiEdit className="mr-2 text-gray-400" />}
                    />
                    <Input
                      name="address"
                      value={isEditing ? editData?.address : datas.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="bg-gray-50 px-3 py-2 rounded"
                      startAdornment={
                        <FaMapPin className="mr-2 text-gray-400" />
                      }
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                    <p className="flex items-center gap-2">
                      <IoTimeOutline size={20} className=" text-gray-500" />{" "}
                      <span className="font-medium">Age:</span>{" "}
                      {details[0]?.age || "Not set"}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiMail size={20} className=" text-gray-500" />{" "}
                      {user?.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <IoCallOutline size={20} className=" text-gray-500" />{" "}
                      {user?.phone || "Not set"}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiEdit size={20} className=" text-gray-500" />{" "}
                      <span className="font-medium">Occupation:</span>{" "}
                      {details[0]?.occupation || "Not set"}
                    </p>

                    <p className="flex items-center gap-2 col-span-1 md:col-span-2">
                      <FaRegAddressCard size={20} className=" text-gray-500" />{" "}
                      <span className="font-medium">Address:</span>{" "}
                      {details[0]?.address || "Not set"}
                    </p>
                  </div>
                )}

                {isEditing ? (
                  <div className="flex gap-2 mt-4">
                    <Button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={handleSubmit}
                    >
                      {isEditing ? "Update" : "Add"}
                    </Button>

                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outlined"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outlined"
                    color="primary"
                    startIcon={<FiEdit />}
                    className="mt-2"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Profilesection;
