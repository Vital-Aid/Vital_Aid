import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export interface IUser {
    _id: string;
    name: string;
  }
export interface IReview {
    _id: string;
    userId: IUser;
    doctorId: string;
    rating: number;
    comment?: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  }
  

export const fetchDoctorById = async (id: string) => {
    if (!id) throw new Error("Doctor ID is required");
    
    
    const response = await axiosInstance.get(`/doctors/getdetail/${id}`);
  

    if (!response.data || !response.data.data || response.data.data.length === 0) {
        throw new Error("Doctor not found");
    }

    return response.data.data[0]; 
};


const fetchReviews=async(id:string)=>{
   const response= await axiosInstance.get(`users/getallreview/${id}`)
   console.log("sdhfsgyftye",response.data);
   
    return response.data?.data
}

export const useDoctorReview = (id:string) => {
    return useQuery({
        queryKey: ["reviews", id],
        queryFn: () =>fetchReviews(id),
    });
};
