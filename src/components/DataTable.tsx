import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrayTypes } from "../../types";
import { useAppSelector } from "../redux/hooks";
import { FaSortAlphaDown as AlphabeticIcon } from "@react-icons/all-files/fa/FaSortAlphaDown";
import { RiArrowUpDownFill as GenderIcon } from "@react-icons/all-files/ri/RiArrowUpDownFill";
import formatDate from "../utils/formatDate";

const DataTable = () => {
  const [paginatedData, setPaginatedData] = useState<ArrayTypes>([]);
  const [sort, setSort] = useState(false);
  const [sortName, setSortName] = useState(false);
  const [sortGender, setSortGender] = useState(false);
  const itemsPerPage = 9;

  const { searchData } = useAppSelector((state) => state.searchReducer);

  const { id } = useParams<{ id: string }>();

  const location = useLocation();

  useEffect(() => {
    const startIndex = Number(id) * itemsPerPage - 9 || 0;
    const endIndex = startIndex + itemsPerPage;

    let data = [] as ArrayTypes;

    if (sortName) {
      data = [...searchData];

      data.sort((a, b) => {
        const nameA = a.name.first.toUpperCase();
        const nameB = b.name.first.toUpperCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        return 0;
      });
    } else {
      data = [...searchData];

      data.sort((a, b) => {
        const genderA = a.gender;
        const genderB = b.gender;

        if (sortGender) {
          if (genderA > genderB) return -1;
          if (genderA < genderB) return 1;
        }

        if (genderA < genderB) return -1;
        if (genderA > genderB) return 1;
        return 0;
      });
    }

    const pag = sort
      ? data.slice(startIndex, endIndex)
      : searchData.slice(startIndex, endIndex);

    setPaginatedData(pag);
  }, [id, searchData, sortName, sortGender, sort]);

  return (
    <div>
      {paginatedData.length === 0 ? (
        <div>No items found.</div>
      ) : (
        <>
          <table className="border border-opacity-40 border-gray-700 p-4 w-full">
            <thead className="bg-gray-300">
              <tr className="border border-opacity-40 border-gray-700">
                <th
                  className="p-2 border border-opacity-40 border-gray-700 cursor-pointer relative w-64"
                  onClick={() => {
                    setSortGender(false);
                    setSortName(!sortName);
                    setSort(true);
                  }}
                >
                  Name
                  <span className="absolute right-2 top-3.5 opacity-80">
                    <AlphabeticIcon />
                  </span>
                </th>
                <th
                  className="p-2 border border-opacity-40 border-gray-700 cursor-pointer relative"
                  onClick={() => {
                    setSortName(false);
                    setSortGender(!sortGender);
                    setSort(true);
                  }}
                >
                  Gender
                  <span className="absolute right-2 top-3.5 opacity-80">
                    <GenderIcon className="text-lg" />
                  </span>
                </th>
                <th className="p-2">Birth</th>
                <th className="p-2 border border-opacity-40 border-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {paginatedData?.map((item) => {
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
                        className="bg-gray-700 font-bold text-white px-8 py-1.5 hover:bg-gray-600"
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
        </>
      )}
    </div>
  );
};

export default DataTable;
