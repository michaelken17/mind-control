import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    authorized: false,
    username: null,
    isLoggedOut: null,
    email: null,
  },
  reducers: {
    login: (state, action) => {
        state.authorized = true;
        state.isLoggedOut = null;
        state.user = action.payload.Username;
        state.email = action.payload.Email;
        state.pass = action.payload.Password;
    },
    logout: (state, action) => {
        state.authorized= false;
        state.user= null;
        state.isLoggedOut= true;
    },
  },
});

export const loginActions  = loginSlice.actions;
export default loginSlice.reducer;