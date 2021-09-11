import { useEffect, useState } from "react";
import { NavLink as Link, useLocation, useParams } from "react-router-dom";
import { ArrayTypes } from "../../types";
import { useAppSelector } from "../redux/hooks";
import formatDate from "../utils/formatDate";
import range from "../utils/range";

const DataTable = () => {
  const [paginatedData, setPaginatedData] = useState<ArrayTypes>([]);
  const [pages, setPages] = useState([1]);
  const [detailId, setDetailId] = useState([1]);
  const itemsPerPage = 9;

  const { searchData } = useAppSelector((state) => state.searchReducer);

  const { id } = useParams<{ id: string }>();

  const location = useLocation();

  const { pathname } = useLocation();

  useEffect(() => {
    const itemsQty: number[] = range(50);
    const indexStart = Number(id) || 1;

    const sliced = itemsQty.slice(
      indexStart !== 1 ? itemsPerPage * (indexStart - 1) : indexStart - 1,
      itemsPerPage * indexStart
    );

    setDetailId(sliced);
  }, [id]);

  useEffect(() => {
    const length = range(Math.ceil(searchData.length / itemsPerPage)) || [1];

    setPages(length);
  }, [searchData.length]);

  console.log(searchData);

  useEffect(() => {
    const startIndex = Number(id) * itemsPerPage - 9 || 0;
    const endIndex = startIndex + itemsPerPage;

    const pag = searchData.slice(startIndex, endIndex);

    setPaginatedData(pag);
  }, [id, searchData]);

  return (
    <div>
      {paginatedData.length === 0 ? (
        <div>No items found.</div>
      ) : (
        <>
          <table className="border border-opacity-40 border-gray-700 p-4 w-full">
            <thead className="bg-gray-300">
              <tr className="border border-opacity-40 border-gray-700">
                <th className="p-2 border border-opacity-40 border-gray-700">
                  Name
                </th>
                <th className="p-2 border border-opacity-40 border-gray-700">
                  Gender
                </th>
                <th className="p-2">Birth</th>
                <th className="p-2 border border-opacity-40 border-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {paginatedData?.map((item, key) => {
                const name = `${item.name.first} ${item.name.last}`;

                return (
                  <tr
                    key={item.login.salt}
                    className="border border-opacity-40 border-gray-700"
                  >
                    <td className="border border-opacity-40 border-gray-700 p-2">
                      {name}
                    </td>
                    <td className="border border-opacity-40 border-gray-700 p-2">
                      {item.gender === "male" ? "Male" : "Female"}
                    </td>
                    <td className="border border-opacity-40 border-gray-700 p-2">
                      {formatDate(item.dob.date)}
                    </td>
                    <td className="border border-opacity-40 border-gray-700 p-2">
                      <Link
                        className="bg-gray-700 rounded font-bold text-white px-8 py-1.5 hover:bg-gray-600"
                        to={{
                          pathname: `/details/${detailId[key]}`,
                          state: { background: location },
                        }}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

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
        </>
      )}
    </div>
  );
};

export default DataTable;
