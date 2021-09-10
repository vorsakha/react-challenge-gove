import { Link, useLocation } from "react-router-dom";
import DataTable from "../components/DataTable";
import Search from "../components/Search";
import { useAppSelector } from "../redux/hooks";

const Dashboard = () => {
  const { data } = useAppSelector((state) => state.apiReducer);

  let location = useLocation();
  return (
    <div>
      <Link
        to={{
          pathname: `/details/${data[0]?.login.salt}`,
          state: { background: location },
        }}
      >
        Link modal
      </Link>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
        deleniti modi culpa ipsa. Voluptatem fuga eius quis dicta fugit itaque
        nobis ipsam ipsa corrupti. Illum cupiditate nulla delectus blanditiis
        repellat pariatur illo? Odit, fuga nisi.
      </p>

      <Search />

      <DataTable />
    </div>
  );
};

export default Dashboard;
