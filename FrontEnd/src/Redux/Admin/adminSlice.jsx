import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    LoginAdmin: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    LogoutAdmin: (sate, action) => {
      Cookies.remove("userDetails", { secure: true });
      return [];
    },
  },
});

export const { LoginAdmin, LogoutAdmin } = adminSlice.actions;

export const adminSLiceReducer = adminSlice.reducer;
