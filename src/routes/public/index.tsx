import { Navigate, RouteObject } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import RecoverPassword from "@/pages/RecoverPassword";
import NotFound from "@/pages/NotFound";
import { PublicRoute } from "./layout";

const createPublicRoute = (element: React.ReactNode): React.ReactNode => (
  <PublicRoute>{element}</PublicRoute>
);

export const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: createPublicRoute(<Login />),
  },
  {
    path: "/registro",
    element: createPublicRoute(<Register />),
  },
  {
    path: "/esqueci-senha",
    element: createPublicRoute(<ForgotPassword />),
  },

  {
    path: "*",
    element: <Navigate to="/nao-encontrado" replace />,
  },
];
