import React, { useEffect, useState } from "react";
import { ArrayTypes } from "../../types";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSearchResults } from "../redux/searchResults/slice";

const Search = () => {
  const [params, setParams] = useState<string>("");
  const [searchResults, setResults] = useState<ArrayTypes | []>([]);

  const handleSearch = (e: any) => {
    setParams(e.target.value);
  };

  const { data } = useAppSelector((state) => state.apiReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const filterByName = data.filter((item) => {
      const name = item.name.first + item.name.last;

      return name.includes(params);
    });

    setResults(filterByName);
  }, [params, data]);

  useEffect(() => {
    dispatch(setSearchResults(searchResults));
  }, [searchResults, dispatch]);

  return (
    <input value={params} onChange={(e) => handleSearch(e)} type="search" />
  );
};

export default Search;
