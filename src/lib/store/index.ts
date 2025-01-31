import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/userSlice";  // Existing auth reducer
import userReducer from "./features/userlistSlice"; // Import your new users slice
import eventReducer from "./features/eventSlice"
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,  // Authentication slice
      users: userReducer, // Users list slice
      events:eventReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
