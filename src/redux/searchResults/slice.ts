import { SearchStateTypes } from "./../../../types.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "search",
  initialState: {
    searchData: [],
  },
  reducers: {
    setSearchResults: (state: SearchStateTypes, action: PayloadAction<any>) => {
      state.searchData = action.payload.data;
    },
  },
});

export default slice.reducer;

export const { setSearchResults } = slice.actions;
