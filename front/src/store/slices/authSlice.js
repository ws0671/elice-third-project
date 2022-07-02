import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    LOGIN_SUCCESS: (state, action) => {
      console.log("%c로그인!", "color: #d93d1a;");
      state.value = { ...action.payload };
    },
    LOGOUT: (state) => {
      console.log("%c로그아웃!", "color: #d93d1a;");
      state.value = null;
    },
  },
});

export const { LOGIN_SUCCESS, LOGOUT } = authSlice.actions;

export default authSlice.reducer;
