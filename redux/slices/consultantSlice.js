import { createSlice } from "@reduxjs/toolkit";

const consultantSlice = createSlice({
  name: "login",
  initialState: {
    name: "",
    work: "",
    rating: "",
    specialty: "",
    price: "",
  },
  reducers: {
    saveConsultant: (state, action) => {
      state.name = action.payload.name;
      state.work = action.payload.work;
      state.rating = action.payload.rating;
      state.specialty = action.payload.specialty;
      state.price = action.payload.price;
    },
  },
});

export const consultantActions = consultantSlice.actions;
export default consultantSlice.reducer;
