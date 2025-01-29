import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";
import Cookies from "js-cookie";
import axiosErrorManager from "@/utils/axiosErrormanager";

interface User {
  _id: string;
  profileImage: {
    originalProfile: string;
    thumbnail: string;
  };
  name: string;
  email: string;
  phone: string;
  admin: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
};

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/getUsers");
      console.log('responelist',response);
      
      return response.data.users; // Assuming backend returns { users: [...] }
    } catch (error) {
      return rejectWithValue(axiosErrorManager(error));
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch users.";
      });
  },
});


export default userSlice.reducer;
