import axiosErrorManager from "@/utils/axiosErrormanager";
import axiosInstance from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface User {
    _id: string;
    name: string;
    email: string;
  }
  
  interface Equipment {
    _id: string;
    name: string;
    quantity: number;
    description: string;
  }
  
  interface Request {
    _id: string;
    user: User |null;
    equipment: Equipment[] |null;
    location: string;
    status: "pending"|"accepted"|"deliverd"|"cancell"; 
    __v: number;
  }

  interface requestState{
    allRequest:Request[]|null,
    request:Request|null,
    isLoading:boolean,
    error:string|null

  }

  const initialState:requestState={
    allRequest:null,
    request:null,
    isLoading:false,
    error:null
  }

  export const getallRequest = createAsyncThunk<{ allRequest: Request[], totalPages: number }, number, { rejectValue: string }>('getallRequest', async (page, { rejectWithValue }) => {
    try {
        
        const response = await axiosInstance.get(`/users/userrequest?page=${page}&limit=3`)
        return {
            allRequest: response.data.allEquipment,
            totalPages: response.data.totalPages
        }
    } catch (error) {
        return rejectWithValue(axiosErrorManager(error));
    }
})


  const RequestSlice=createSlice({
    name:'request',
    initialState,
    reducers:{},
    extraReducers:(builders)=>{
        builders
        .addCase(getallRequest.pending, (state) => {
            state.error = null;
            state.isLoading = true;
          })
          .addCase(getallRequest.fulfilled, (state, action) => {
            state.error = null;
            state.isLoading = false;
            state.allRequest = action.payload.allRequest; 
          })
          .addCase(getallRequest.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload ?? "An error occurred";
          });
    }
  })





  export default RequestSlice.reducer

  