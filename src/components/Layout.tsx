import React, { useEffect } from "react";
import { getPatients } from "../redux/api/thunk";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Header from "./Header";
import Search from "./Search";

const Layout: React.FC = ({ children }) => {
  const { data } = useAppSelector((state) => state.apiReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    data.length === 0 && dispatch(getPatients());
  });

  return (
    <div>
      <Header />

      <div>
        <p>
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
