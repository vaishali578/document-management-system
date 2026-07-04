import { Link } from "react-router-dom";

function Dashboard() {

  const userName = localStorage.getItem("user_name");

  return (
    <div className="container mt-5">

      <h2>Welcome {userName}</h2>

      <hr />

      <div className="d-flex gap-3">

        <Link
          to="/upload"
          className="btn btn-primary"
        >
          Upload Document
        </Link>

        <Link
          to="/search"
          className="btn btn-success"
        >
          Search Document
        </Link>

        <Link
          to="/admin"
          className="btn btn-dark"
        >
          Admin
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;