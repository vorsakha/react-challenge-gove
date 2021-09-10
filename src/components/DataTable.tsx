import { useAppSelector } from "../redux/hooks";

const DataTable = () => {
  const { searchData } = useAppSelector((state) => state.searchReducer);

  return <div>table</div>;
};

export default DataTable;
