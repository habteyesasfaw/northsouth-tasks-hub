import { createSlice } from "@reduxjs/toolkit";
import {
  login,
 
} from "./thunk";

export const initialState = {
  logins: false,
  registers: false,


  authPermLoading: false,
};

const AuthManagementSlice = createSlice({
  name: "AuthManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
   


  },
});

export default AuthManagementSlice.reducer;
