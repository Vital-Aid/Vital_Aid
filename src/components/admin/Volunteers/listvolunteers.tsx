'use client'
import { getAllvolunteers } from '@/lib/store/features/volunteers'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { RiEdit2Fill } from "react-icons/ri";

const Listvolunteers = () => {
    const { allVolunteers, error, isLoading } = useAppSelector((state) => state.volunteers)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(getAllvolunteers())
    }, [])

    return (
        <div className="w-full h-fit flex flex-col px-2 justify-center items-center overflow-y-scroll scrollbar-none">
            <div className="overflow-x-auto w-full sm:w-3/4">
                <table className="w-full border-collapse rounded-lg shadow-lg">
                    <thead className="bg-green-200">
                        <tr className="text-left text-sm md:text-base">
                            <th className="p-2 md:p-3">ID</th>
                            <th className="p-2 md:p-3">Username</th>
                            <th className="p-2 md:p-3">Profile</th>
                            <th className="p-2 md:p-3">Gender</th>
                            <th className="p-2 md:p-3">Phone</th>
                            <th className="p-2 md:p-3">Status</th>
                            <th className="p-2 md:p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allVolunteers && allVolunteers.map((volunteer) => (
                            <tr key={volunteer._id} className="border-b hover:bg-gray-100 text-xs md:text-sm">
                                <td className="p-2 md:p-3">{volunteer._id}</td>
                                <td className="p-2 md:p-3 font-semibold">{volunteer.name}</td>
                                <td className="p-2 md:p-3">
                                    {volunteer.image ? (
                                        <Image
                                            src={volunteer.image}
                                            alt="Profile"
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                            ❓
                                        </div>
                                    )}
                                </td>
                                <td className="p-2 md:p-3">{volunteer.gender}</td>
                                <td className="p-2 md:p-3">{volunteer.phone}</td>
                                <td className="p-2 md:p-3">
                                    <span className={`cursor-pointer ${volunteer.isDeleted ? 'text-red-500' : 'text-green-500'}`}>
                                        {volunteer.isDeleted ? 'Inactive' : 'Active'}
                                    </span>
                                </td>
                                <td className="p-2 md:p-3 text-center">
                                    <RiEdit2Fill className="w-4 h-4 md:w-5 md:h-5 cursor-pointer text-blue-500" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Listvolunteers;
