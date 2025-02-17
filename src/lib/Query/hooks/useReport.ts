"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

const fetchReports = async (id: string) => {
  const response = await axiosInstance.get(`/users/getreportof/${id}`);
  return response.data;
};

export function useFetchreport(id: string) {
  const { data: reports = [] } = useQuery({
    queryKey: ["report", id],
    queryFn: () => fetchReports(id),
    enabled: !!id,
  });
  return { reports };
}

const fetchDetails = async (id: string) => {
  const response = await axiosInstance.get(`/users/getdetails/${id}`);
  return response.data;
};

export function useFetchDetails(id: string) {
  const { data: details = [] } = useQuery({
    queryKey: ["details", id],
    queryFn: () => fetchDetails(id),
    enabled: !!id,
  });
  return { details };
}
