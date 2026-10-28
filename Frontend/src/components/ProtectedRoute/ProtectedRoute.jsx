
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ role }) {
  const { user } = useAuth();

  // If the user is not logged in, redirect to login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect users who have the wrong role.
  if (role && user.role !== role) {
    return (
      <Navigate
        to={user.role === "teacher" ? "/teacher" : "/student"}
        replace
      />
    );
  }

  // Display the requested page.
  return <Outlet />;
}
