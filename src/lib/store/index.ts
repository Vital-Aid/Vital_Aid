import { configureStore } from "@reduxjs/toolkit";
import  userReducer from "./features/userSlice"
import EquipmentSlice from "./features/EquipmentSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
     auth: userReducer,
     equipments:EquipmentSlice
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];