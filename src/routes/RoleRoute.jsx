import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants/appConstants";
import { useAuth } from "../features/auth";
import { getUserRoles } from "../features/auth/utils/auth.utils";

export function RoleRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

  const allowedRoles = roles.map((role) => String(role).toLowerCase());
  const userRoles = getUserRoles(user);

  if (!userRoles.some((role) => allowedRoles.includes(role))) {
    return <Navigate to={"/"} replace />; 
  }

  return children;
}
