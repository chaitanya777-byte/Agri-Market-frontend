import { Navigate } from "react-router-dom";

const PrivateRoute = ({ role, children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || user?.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
