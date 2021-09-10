import { useEffect, useState } from "react";
import { NavLink as Link, useLocation, useParams } from "react-router-dom";
import { ArrayTypes } from "../../types";
import { useAppSelector } from "../redux/hooks";
import formatDate from "../utils/formatDate";
import range from "../utils/range";

const DataTable = () => {
  const [paginatedData, setPaginatedData] = useState<ArrayTypes>([]);
  const [pages, setPages] = useState([1]);
  const itemsPerPage = 9;

  const { searchData } = useAppSelector((state) => state.searchReducer);

  const location = useLocation();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const length = range(Math.ceil(searchData.length / itemsPerPage)) || [1];

    setPages(length);
  }, [searchData.length]);

  useEffect(() => {
    const startIndex = Number(id) * itemsPerPage || 0;
    const endIndex = startIndex + itemsPerPage;

    const pag = searchData.slice(startIndex, endIndex);

    setPaginatedData(pag);
  }, [id, searchData]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.map((item) => {
            const name = `${item.name.first} ${item.name.last}`;

            return (
              <tr key={item.login.salt}>
                <td>{name}</td>
                <td>{item.gender}</td>
                <td>{formatDate(item.dob.date)}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/details/${item.login.salt}`,
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

      <div>
        {pages.map((i) => (
          <Link activeClassName="font-bold" to={`/page/${i}`} key={i}>
            {i}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
