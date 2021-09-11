import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import { useAppSelector } from "../redux/hooks";

const Dashboard = () => {
  const { loading } = useAppSelector((state) => state.apiReducer);

  return (
    <div>
      {loading ? (
        <div className="mx-auto pt-8">loading...</div>
      ) : (
        <>
          <DataTable />

          <Pagination />
        </>
      )}
    </div>
  );
};

export default Dashboard;
