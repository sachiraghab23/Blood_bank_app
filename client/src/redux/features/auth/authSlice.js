import { createSlice } from "@reduxjs/toolkit";

const initialSlice = {
  loading: false,
  user: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialSlice,
  reducers: {},
  extraReducers: {},
});

export default authSlice;
