import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark">

      <div className="container">

        <Link
          to="/dashboard"
          className="navbar-brand"
        >
          DMS
        </Link>

        <div className="d-flex align-items-center">

          <span className="text-white me-3">
            {user.user_name}
          </span>

          <button
            onClick={handleLogout}
            className="btn btn-danger btn-sm"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;