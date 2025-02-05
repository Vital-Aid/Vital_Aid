"use client";

import React from "react";
import { useDoctorUser } from "@/lib/Query/hooks/useDocterUser";
import Link from "next/link";
import Image from "next/image";

interface Doctor {
  description: string;
  email: string;
  name: string;
  phone: string;
  _id: string;
  profileImage: string;
  qualification: string[];
  specialization: string[];
}

function DoctorList() {
  const { doctors } = useDoctorUser();

  const doctorList: Doctor[] = Array.isArray(doctors?.data?.data)
    ? doctors.data?.data
    : [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Meet Our Doctors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctorList.length > 0 ? (
          doctorList.map((doctor, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center  p-4 rounded-lg"
            >
              {/* Profile Image (Fixed Size) */}
              <div className="w-44 h-44 rounded-full overflow-hidden border-blue-500">
                <Image
                  src={doctor.profileImage}
                  alt={doctor.name || "Doctor profile image"}
                  width={175}
                  height={175}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Doctor Name */}
              <h3 className="text-lg font-semibold mt-3">{doctor.name}</h3>

              {/* Qualifications */}
              <p className="text-sm text-gray-500">{doctor.qualification.join(", ")}</p>

              {/* View Profile Link */}
              <Link
                href={`/doctor/${doctor._id}`}
                className="mt-3 text-blue-600 font-medium hover:underline"
              >
                View Profile
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No doctors found.</p>
        )}
      </div>
    </div>
  );
}

export default DoctorList;
