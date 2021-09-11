import DataTable from "../components/DataTable";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import { useAppSelector } from "../redux/hooks";

const Dashboard = () => {
  const { loading } = useAppSelector((state) => state.apiReducer);

  return (
    <div>
      {!loading ? (
        <LoadingSpinner />
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
