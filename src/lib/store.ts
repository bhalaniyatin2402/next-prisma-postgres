"use client";
import { configureStore } from "@reduxjs/toolkit";
// slice imports
import authReducer from "./slices/authSlice";
// services imports
import api from "./services/api";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: gDM => gDM().concat([api.middleware])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
