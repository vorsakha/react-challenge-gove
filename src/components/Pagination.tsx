import { useEffect, useState } from "react";
import { NavLink as Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import range from "../utils/range";

const Pagination = () => {
  const [pages, setPages] = useState([1]);
  const itemsPerPage = 9;

  const { pathname } = useLocation();

  const { searchData } = useAppSelector((state) => state.searchReducer);

  // Set pages array based on searchData length
  useEffect(() => {
    const length = Math.ceil(searchData.length / itemsPerPage) || 1;
    const newRange = range(length);

    setPages(newRange);
  }, [searchData.length]);

  return (
    <div className="mt-4 flex justify-center">
      {pages.map((i) => (
        <Link
          className={`${
            pathname === "/" && i === 1 ? "bg-gray-200" : "bg-white"
          } border border-opacity-40 border-gray-700 py-1 px-4 mx-1 font-bold hover:bg-gray-200`}
          activeClassName="bg-gray-200"
          to={`/page/${i}`}
          key={i}
        >
          {i}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
