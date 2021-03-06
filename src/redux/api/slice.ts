import { createSlice } from "@reduxjs/toolkit";
import { SliceTypes } from "../../../types";
import { getPatients } from "./thunk";

const slice = createSlice({
  name: "api",
  initialState: {
    data: [],
    loading: false,
  } as SliceTypes,
  //   },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getPatients.fulfilled, (state, action) => {
      state.data = action.payload.results;
      state.loading = false;
    });
    builder.addCase(getPatients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPatients.rejected, (state) => {
      state.data = [];
      state.loading = false;
    });
  },
});

export default slice.reducer;
