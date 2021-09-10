import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSearchResults } from "../redux/searchResults/slice";
import { useLocation, useHistory } from "react-router-dom";

const Search = () => {
  const [params, setParams] = useState<string>("");
  const [filterByName, setFilterByName] = useState<boolean>(false);

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
          const nationality = item.location.country.toUpperCase();
          const normalizedParams = params.replace(/ /g, "").toUpperCase();

          return nationality.includes(normalizedParams);
        });

    dispatch(setSearchResults(filterArray));
  }, [params, data, dispatch, filterByName]);

  return (
    <div>
      <div>
        <div>
          <input
            type="radio"
            id="name"
            name="filter by"
            value="name"
            checked={filterByName}
            onChange={() => setFilterByName(true)}
          />
          <label htmlFor="name">Search by name</label>
        </div>

        <div>
          <input
            type="radio"
            id="nationality"
            name="filter by"
            value="nationality"
            checked={!filterByName}
            onChange={() => setFilterByName(false)}
          />
          <label htmlFor="nationality">Search by nationality</label>
        </div>
      </div>
      <input value={params} onChange={(e) => handleSearch(e)} type="search" />
    </div>
  );
};

export default Search;
