import { createSlice } from "@reduxjs/toolkit";

const consultantSlice = createSlice({
  name: "login",
  initialState: {
    consultantID: 0,
    fullName: "",
    gelar: "",
    gender: "",
    harga: 300000,
    pendidikan: "",
    pengalaman: "",
    rating: 5,
    spesialisasi: "",
    tempatPraktek: "",
  },
  reducers: {
    saveConsultant: (state, action) => {
      state.consultantID = action.payload.consultantID;
      state.fullName = action.payload.fullName;
      state.gelar = action.payload.gelar;
      state.gender = action.payload.gender;
      state.harga = action.payload.harga;
      state.pendidikan = action.payload.pendidikan;
      state.pengalaman = action.payload.pengalaman;
      state.rating = action.payload.rating;
      state.spesialisasi = action.payload.spesialisasi;
      state.tempatPraktek = action.payload.tempatPraktek;
    },
    dateTime: (state, action) => {
      state.date = action.payload.date;
      state.time = action.payload.time;
      state.datetime = action.payload.datetime;
    },
  },
});

export const consultantActions = consultantSlice.actions;
export default consultantSlice.reducer;
