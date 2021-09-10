import DataTable from "../components/DataTable";
import { useAppSelector } from "../redux/hooks";

const Dashboard = () => {
  const { loading } = useAppSelector((state) => state.apiReducer);

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <DataTable />
        </>
      )}
    </div>
  );
};

export default Dashboard;
