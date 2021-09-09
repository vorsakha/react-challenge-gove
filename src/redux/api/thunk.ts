import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://randomuser.me/api/?results=50";

export const getPatients = createAsyncThunk("api/getPatients", async () => {
  const res = await axios.get(url);

  return res.data;
});
