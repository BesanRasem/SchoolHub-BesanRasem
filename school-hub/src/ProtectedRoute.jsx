import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ allowedRole, children }) {
  const { accessToken, user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Checking authentication...
      </div>
    );
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to={`/dashboard/${user?.role}`} replace />;
  }

  if (children) return children;

  return <Outlet />;
}

export default ProtectedRoute;