import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";

// Redux Store 생성
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
