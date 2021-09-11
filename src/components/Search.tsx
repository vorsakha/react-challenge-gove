import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSearchResults } from "../redux/searchResults/slice";
import { useLocation, useHistory } from "react-router-dom";
import { GoSearch as SearchIcon } from "@react-icons/all-files/go/GoSearch";

const Search = () => {
  const [params, setParams] = useState<string>("");
  const [filterByName, setFilterByName] = useState<boolean>(true);

  const { pathname } = useLocation();
  const history = useHistory();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (pathname !== "/") {
      history.push("/");
    }

    setParams(e.target.value);
  };

  const { data } = useAppSelector((state) => state.apiReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const filterArray = filterByName
      ? data.filter((item) => {
          const name = (item.name.first + item.name.last).toUpperCase();
          const normalizedParams = params.replace(/ /g, "").toUpperCase();

          return name.includes(normalizedParams);
        })
      : data.filter((item) => {
          const nationality = item.location.country
            .replace(/ /g, "")
            .toUpperCase();
          const normalizedParams = params.replace(/ /g, "").toUpperCase();

          return nationality.includes(normalizedParams);
        });

    dispatch(setSearchResults(filterArray));
  }, [params, data, dispatch, filterByName]);

  return (
    <div>
      <div className="flex gap-8">
        <div>
          <input
            className="mr-2"
            type="radio"
            id="name"
            name="filter by"
            value="name"
            checked={filterByName}
            onChange={() => setFilterByName(true)}
          />
          <label className="cursor-pointer" htmlFor="name">
            Search by name
          </label>
        </div>

        <div>
          <input
            className="mr-2"
            type="radio"
            id="nationality"
            name="filter by"
            value="nationality"
            checked={!filterByName}
            onChange={() => setFilterByName(false)}
          />
          <label className="cursor-pointer" htmlFor="nationality">
            Search by nationality
          </label>
        </div>
      </div>
      <div className="flex p-1 w-full rounded border border-opacity-40 border-gray-700 mb-4 bg-white">
        <input
          className="w-full focus:outline-none px-2"
          value={params}
          onChange={(e) => handleSearch(e)}
          type="search"
        />
        <span className="flex items-center bg-grey-lighter rounded rounded-r-none px-3 font-bold text-grey-darker opacity-50">
          <SearchIcon />
        </span>
      </div>
    </div>
  );
};

export default Search;
