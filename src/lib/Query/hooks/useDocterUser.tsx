"use client" 
import axiosInstance from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"
 
const fetchDoctors=()=>{
    return axiosInstance.get("/doctors/getAllDoctors")
}


export const useDoctorUser=()=>{
     const {data:doctors}=useQuery({
        queryKey:["doctor"],
        queryFn:fetchDoctors
     })
     return {doctors}
}
 