import React, { useEffect } from "react";
import { getPatients } from "../redux/api/thunk";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Header from "./Header";
import Search from "./Search";

const Layout: React.FC = ({ children }) => {
  const { data } = useAppSelector((state) => state.apiReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data.length === 0 || data === null) {
      dispatch(getPatients());
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="max-w-3xl flex flex-col mx-auto p-4 py-14 leading-7">
        <p className="my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          deleniti modi culpa ipsa. Voluptatem fuga eius quis dicta fugit itaque
          nobis ipsam ipsa corrupti. Illum cupiditate nulla delectus blanditiis
          repellat pariatur illo? Odit, fuga nisi.
        </p>

        <Search />

        {children}
      </div>
    </div>
  );
};

export default Layout;
