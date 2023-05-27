import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    authorized: false,
    username: null,
    fullname: null,
    isLoggedOut: null,
    email: null,
    userid: 0,
    consultant: false,
    MHpoints : 0,
    isDoneMHC: "false"
  },
  reducers: {
    login: (state, action) => {
      state.authorized = true;
      state.isLoggedOut = null;
      state.username = action.payload.username;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.pass = action.payload.password;
      state.MHpoints = action.payload.MHpoints;
      state.consultant = action.payload.consultant;
      state.userid = action.payload.userid;
      state.isDoneMHC = action.payload.isDoneMHC;
    },
    logout: (state, action) => {
      state.authorized = false;
      state.username = null;
      state.isLoggedOut = true;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
