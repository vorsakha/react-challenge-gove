import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import formatDate from "../utils/formatDate";

const DataTable = () => {
  const { searchData } = useAppSelector((state) => state.searchReducer);

  const location = useLocation();
  return (
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
        {searchData?.map((item) => {
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
  );
};

export default DataTable;
