import React, { useEffect } from "react";
import { getPatients } from "../redux/api/thunk";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Layout: React.FC = ({ children }) => {
  const { data } = useAppSelector((state) => state.apiReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    data.length === 0 && dispatch(getPatients());
  });

  return <div>{children}</div>;
};

export default Layout;
