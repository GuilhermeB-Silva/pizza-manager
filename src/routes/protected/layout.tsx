import { Navigate, useLocation } from "react-router-dom";

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  //   const { user, isAdmin } = useUserStore();

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       Carregando...
  //     </div>
  //   );
  // }

  //   if (!user) {
  //     return <Navigate to="/login" replace />;
  //   }

  //   if (!isAdmin()) {
  //     return <Navigate to="/minha-area" replace />;
  //   }

  return <>{children}</>;
};
