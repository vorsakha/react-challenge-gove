import React, { useEffect } from "react";
import { getPatients } from "../redux/api/thunk";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Dashboard = () => {
  const state = useAppSelector((state) => state);
  console.log(state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  return <div>Dashboard</div>;
};

export default Dashboard;
