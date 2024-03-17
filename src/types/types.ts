import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface RegisterType {
  name: string | null;
  email: string | null;
  password: string | null;
}

export type ResponseType = {
  data: { success: boolean };
} | {
  error: FetchBaseQueryError | SerializedError;
} 
