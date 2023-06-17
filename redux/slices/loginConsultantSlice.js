import { createSlice } from "@reduxjs/toolkit";

const loginConsultantSlice = createSlice({
  name: "loginConsultant",
  initialState: {
    authorized: false,
    username: null,
    fullname: null,
    isLoggedOut: null,
    email: null,
    gelar: "",
    pendidikan: "",
    spesialisasi: "",
    pengalaman: "",
    consultantid: 0,
    tempatpraktek: "",
    harga: 0,
  },
  reducers: {
    loginConsultant: (state, action) => {
      state.authorized = true;
      state.isLoggedOut = null;
      state.username = action.payload.username;
      state.fullname = action.payload.fullname;
      state.gelar = action.payload.gelar;
      state.pendidikan = action.payload.pendidikan;
      state.spesialisasi = action.payload.spesialisasi;
      state.pengalaman = action.payload.pengalaman;
      state.consultantid = action.payload.consultantid;
      state.tempatpraktek = action.payload.tempatpraktek;
      state.harga = action.payload.harga;
    },
    logoutConsultant: (state, action) => {
      state.authorized = false;
      state.username = null;
      state.isLoggedOut = true;
    },
  },
});

export const loginConsultantAction = loginConsultantSlice.actions;
export default loginConsultantSlice.reducer;
