import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getUserRoles } from "../utils/auth";

export function RoleRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  const allowedRoles = roles.map((role) => String(role).toLowerCase());
  const userRoles = getUserRoles(user);

  if (!userRoles.some((role) => allowedRoles.includes(role))) {
    return <Navigate to="/" replace />; 
  }

  return children;
}
