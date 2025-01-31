
"use client"
import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import { Button } from "@mui/material";
import React, { useState } from "react";


const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [special,setSpecial]=useState([])
  const [Qualification,setQualification]=useState([])

  const [regdr, setRegdr] = useState({})
  console.log(regdr);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/registerDocter", formData);
      setRegdr(response.data.data)
      setFormData({ name: "", email: "", phone: "", password: "" });


    } catch (error) {
      axiosErrorManager(error)
    }
  }

  return (
    <div className="w-full p-4 pl-12 bg-white ">
      <form className="flex flex-col  space-y-3" onSubmit={handlesubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Doctor's Name"
          className="w-[430px] h-14 p-2 border border-gray-300 rounded-lg"
          required
        />

        <label>Email ID</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Doctor's Email"
          className="w-[430px] h-14 p-2 border border-gray-300 rounded-lg"
          required
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Doctor's Phone number"
          className="w-[430px] h-14 p-2 border border-gray-300 rounded-lg"
          required
        />
        <label>Password</label>
        <div className="flex gap-4">

          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="enter the password"
            className="w-60 h-14 p-2 border border-gray-300 rounded-lg"
            required
          />
          <Button
            type="submit"
            variant="contained"
          >
            Register Doctor
          </Button>

        </div>
      </form>


      <form className="mt-9">
        <h1 className="mb-3 font-bold text-green-400">add Details</h1>
        <div className="flex gap-4">
          <input
            type="text"
            
            placeholder="enter the password"
            className="w-[430px] h-14 p-2 border border-gray-300 rounded-lg"
            required
          />
          <Button
            type="submit"
            variant="contained"
          >
            add
          </Button>
          <input
            type="text"
            
            placeholder="enter the password"
            className="w-[430px] h-14 p-2 border border-gray-300 rounded-lg"
            required
          />
          <Button
            type="submit"
            variant="contained"
          >
            add
          </Button>
        </div>

      </form>
    </div >
  );
};

export default AddDoctor;

