"use client";
import { createSlice } from "@reduxjs/toolkit";

interface AuthInitialStateType {
  isLoggedIn: Boolean;
  id: number | null;
  name: string;
  email: string;
}

const initialState = {
  isLoggedIn: false,
  id: null,
  name: "",
  email: "",
} as AuthInitialStateType;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      return action.payload
    }
  }
})

export const { setCredentials } = authSlice.actions
export default authSlice.reducer
