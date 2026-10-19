import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // if (user) {
  //   if (isAdmin()) {
  //     return <Navigate to="/admin/dashboard" replace />;
  //   }
  //   return <Navigate to="/minha-area" replace />;
  // }

  return <>{children}</>;
};
