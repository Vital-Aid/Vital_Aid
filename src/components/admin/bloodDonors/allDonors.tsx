"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { deleteDonor, fetchDonors } from "@/lib/store/features/donorsSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@mui/material";
import { Donor } from "@/lib/store/features/donorsSlice";

function AllDonors() {
  const { donors, loading, error, totalPages } = useAppSelector((state) => state.donors);
  const [currentPage, setCurrentPage] = useState(1);
  const [group,setgroup]=useState<string>("All")
  const[donorsbygroup,setDonorsbygroup]=useState<Donor[]|null>(null)
  
  
useEffect(()=>{
  if(group=="All"){
    setDonorsbygroup(null)
  }else{
    const filterddonor=donors.filter((donor)=>donor.BloodGroup==group)
    setDonorsbygroup(filterddonor)
  }
},[group])
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchDonors(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleEdit = (id: string) => {
    router.push(`/admin/editDonors/${id}`);
  };
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      await dispatch(deleteDonor(id));
      dispatch(fetchDonors(1));
    }
  };

  return (
    <div className="p-6 w-full mx-auto bg-white dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-4 text-center">
        All Donors
      </h2>
<div className='flex justify-between mb-3 w-full '>
    <div>
      <select
            defaultValue="All"
            onChange={(e)=>setgroup(e.target.value)}
            className="h-10 w-28 border rounded-lg focus:ring bg-sky-50"
          >
            <option value="All" >
              All
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
      </div>
      <div className="pr-1 mt-4">
        <Link href={"/admin/addDonors"}>
          <Button variant="outlined">Add a Donor</Button>
        </Link>
      </div>
 </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden text-center">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border p-3 text-gray-700 dark:text-white">
                Image
              </th>
              <th className="border p-3 text-gray-700 dark:text-white">Name</th>
              <th className="border p-3 text-gray-700 dark:text-white">
                Blood Group
              </th>
              <th className="border p-3 text-gray-700 dark:text-white">
                Phone
              </th>
              <th className="border p-3 text-gray-700 dark:text-white">
                Gender
              </th>
              <th className="border p-3 text-gray-700 dark:text-white">Age</th>
              <th className="border p-3 text-gray-700 dark:text-white">
                Address
              </th>
              <th className="border p-3 text-gray-700 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {(donorsbygroup?donorsbygroup:donors)?.map((donor) => (
              <tr
                key={donor._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="border p-3">
                  {donor.image && donor.image.length > 0 ? (
                    <Image
                      src={donor.image[0]}
                      alt={donor.name}
                      width={64}
                      height={64}
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {donor.name}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {donor.BloodGroup}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {donor.Phone}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {donor.Gender}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {donor.Age}
                </td>
                <td className="border p-3 text-gray-700 dark:text-gray-300">
                  {donor.Address}
                </td>
                <td className=" p-3 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(donor._id)}
                    className="p-2 mt-4 text-blue-800 rounded-md transition"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(donor._id)}
                    className="p-2 mt-4 text-red-700 rounded-md transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 gap-2">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </Button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="text"
          color="success"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default AllDonors;
