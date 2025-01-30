import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";

interface Equipment {
    _id: string;              
    name: string;                
    image: string;         
    quantity: number;     
    description: string;         
    isDeleted: boolean;         
    createdAt: string;          
    updatedAt: string;           
}

interface EquipmentState {
    equipment: Equipment | null; 
    isLoading: boolean;           
    error: string | null;   
}    

const initialState: EquipmentState = {
    equipment: null, 
    isLoading: false, 
    error: null,      
};

export const addnewEquipment = createAsyncThunk<
    Equipment, 
    FormData,
    { rejectValue: string } 
>(
    'addequipment',
    async (formData, { rejectWithValue }) => { 
        try {
            const response = await axiosInstance.post('/equipment/addequipment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Added equipment:', response.data.data);
            return response.data.data; 
        } catch (error) {
            console.error('Error adding equipment:', error);
            return rejectWithValue("Failed to add equipment");
        }
    }
);

const equipmentSlice = createSlice({
    name: 'equipment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addnewEquipment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addnewEquipment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.equipment = action.payload; 
            })
            .addCase(addnewEquipment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "An unknown error occurred";
            });
    }
});

export default equipmentSlice.reducer;
