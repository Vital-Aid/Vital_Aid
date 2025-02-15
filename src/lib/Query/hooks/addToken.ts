import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";




const fetchtokens=async(id:string)=>{
    const response=await axiosInstance.get(`/users/getalltokens/${id}`)
    return response.data
}

export const useAlltoken = (id:string) => {
    return useQuery({
        queryKey: ["allRequest"],
        queryFn: () =>fetchtokens(id),
    });
};

export const addToken=async(datas:object)=>{
    console.log("datas",datas);
    try {
        await axiosInstance.post("/users/createtoken",datas)
       
        
        toast.success('appointment created successfully')
       
    } catch (error) {
        axiosErrorManager(error)
        console.log("error:",error);
        toast.error('this token already booked')
    }
}


const fetchtokensfordoctors=async(id:string)=>{
    const response=await axiosInstance.get(`/doctors/alltoken/${id}`)
    return response.data
}

export const useAlltokenfordoctor = (id:string) => {
    return useQuery({
        queryKey: ["alltoken"],
        queryFn: () =>fetchtokensfordoctors(id),
    });
};

const fetchtokenseachdoctors=async(date:string)=>{
    const response=await axiosInstance.get(`/doctors/tokensofeachdoctors?date=${date}`)
    return response.data
}

export const useAlltokenofeachdoctors = (date:string) => {
    return useQuery({
        queryKey: ["alltoken",date],
        queryFn: () =>fetchtokenseachdoctors(date),
    });
};
