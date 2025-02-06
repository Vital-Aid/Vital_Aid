"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctorById } from "@/lib/Query/hooks/doctorById";
import Image from "next/image";

export default function Doctor() {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["doctor", id],
    queryFn: () => fetchDoctorById(id as string),
    enabled: !!id,
  });

  console.log("Doctor Data:", data);

  if (isLoading)
    return (
      <div className="text-center text-xl py-10">Loading doctor details...</div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 py-10">
        Error fetching doctor details: {error.message}
      </div>
    );
  if (!data)
    return (
      <div className="text-center text-gray-500 py-10">
        No doctor details found
      </div>
    );

  return (
    <div className="w-full">
      <div className="w-full min-h-screen flex flex-col md:flex-row items-center bg-slate-50 p-10 *:">
        <div className="w-full md:w-1/3 md:mb-14 flex justify-center m-4 mt-5"> {/* Apply negative margin */}
          <Image
            src={data.profileImage}
            alt="Doctor Profile"
            width={256}
            height={256}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>

        <div className="w-full md:w-2/3 text-center md:text-left mt-6 md:mt-0 md:ml-10">
          <h1 className="text-4xl font-bold text-gray-900">
            {data.doctor?.name}
          </h1>
          <p className="text-xl text-pink-600 font-medium mt-2">
            {data.specialization?.join(", ")}
          </p>

          <div className="mt-6">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300">
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
          About
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {data.description}
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">
          Qualifications
        </h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
          {data.qualification?.map((qual: string, index: number) => (
            <li key={index}>{qual}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
