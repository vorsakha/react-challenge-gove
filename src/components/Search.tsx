import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSearchResults } from "../redux/searchResults/slice";

const Search = () => {
  const [params, setParams] = useState<string>("");

  const handleSearch = (e: any) => {
    setParams(e.target.value);
  };

  const { data } = useAppSelector((state) => state.apiReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const filterByName = data.filter((item) => {
      const name = (item.name.first + item.name.last).toUpperCase();

      return name.includes(params.toUpperCase());
    });

    dispatch(setSearchResults(filterByName));
  }, [params, data, dispatch]);

  return (
    <input value={params} onChange={(e) => handleSearch(e)} type="search" />
  );
};

export default Search;
