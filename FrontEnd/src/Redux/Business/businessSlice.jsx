import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {};

export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    loginBusinessAccount: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    logoutBusinessAccount: (state, action) => {
      Cookies.remove("userDetails", { secure: true });
      return [];
    },
  },
});

export const { loginBusinessAccount, logoutBusinessAccount } =
  businessSlice.actions;

export const businessSLiceReducer = businessSlice.reducer;
