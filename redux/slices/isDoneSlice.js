import { createSlice } from "@reduxjs/toolkit";

const isDoneSlice = createSlice({
  name: "isDone",
  initialState: {
    isDoneMHC: false,
    isDoneDpr: false,
    isDoneAnx: false,
    isDoneOcd: false,
    isDoneSd: false,
    isDoneDHC: false,
  },
  reducers: {
    isDone: (state, action) => {
      state.isDoneMHC = action.payload.isDoneMHC;
      state.isDoneDpr = action.payload.isDoneDpr;
      state.isDoneAnx = action.payload.isDoneAnx;
      state.isDoneOcd = action.payload.isDoneOcd;
      state.isDoneDHC = action.payload.isDoneDHC;
    },
  },
});

export const isDoneActions = isDoneSlice.actions;
export default isDoneSlice.reducer;
