import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/userSlice";  // Existing auth reducer
import userReducer from "./features/userlistSlice"; // Import your new users slice

import EquipmentSlice from "./features/EquipmentSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,  // Authentication slice
      users: userReducer, // Users list slice,
     equipments:EquipmentSlice
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
