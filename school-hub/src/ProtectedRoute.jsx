import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // إذا ما في توكن يرجع لصفحة الدخول
  if (!token) {
    return <Navigate to="/" />;
  }

  // إذا الدور مش نفس المسموح
  if (allowedRole && role !== allowedRole) {
    return <Navigate to={`/dashboard/${role}`} />;
  }

  return children;
}

export default ProtectedRoute;
