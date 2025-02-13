import axiosInstance from "@/utils/axios";
import axiosErrorManager from "@/utils/axiosErrormanager";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";




const fetchtokens=async()=>{
    const response=await axiosInstance.get("/users/getalltokens")
    return response.data
}

export const useAlltoken = () => {
    return useQuery({
        queryKey: ["allRequest"],
        queryFn: () =>fetchtokens(),
    });
};

export const addToken=async(datas:object)=>{
    try {
        await axiosInstance.post("/users/createtoken",datas)
        toast.success('appointment created successfully')
       await fetchtokens()
    } catch (error) {
        axiosErrorManager(error)
        console.log("error:",error);
        toast.error('this token already booked')
    }
}