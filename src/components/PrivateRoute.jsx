import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import Navbar from "./Navbar";

function PrivateRoute({ children }) {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default PrivateRoute;