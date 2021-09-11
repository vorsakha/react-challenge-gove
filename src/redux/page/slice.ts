import { StateType } from "./../../../types.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "search",
  initialState: {
    currentPage: null,
  } as StateType,
  reducers: {
    setCurrentPage: (state: StateType, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export default slice.reducer;

export const { setCurrentPage } = slice.actions;
