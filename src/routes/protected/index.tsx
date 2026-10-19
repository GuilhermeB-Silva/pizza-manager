import CustomersPage from "@/pages/CustomersPage";
import Dashboard from "@/pages/Dashboard";
import DeliveryPage from "@/pages/DeliveryPage";
import DrinksPage from "@/pages/DrinksPage";
import EndOfDayPage from "@/pages/EndOfDayPage";
import IntegrationsPage from "@/pages/IntegrationsPage";
import MenuPage from "@/pages/MenuPage";
import OrdersPage from "@/pages/OrdersPage";
import ReportsPage from "@/pages/ReportsPage";
import { Navigate, RouteObject } from "react-router-dom";
import { AdminRoute } from "./layout";

const createAdminRoute = (element: React.ReactNode): React.ReactNode => (
  <AdminRoute>{element}</AdminRoute>
);

export const protectedRoutes: RouteObject[] = [
  {
    children: [
      {
        path: "/dashboard",
        element: createAdminRoute(<Dashboard />),
      },
      {
        path: "/pizzas",
        element: createAdminRoute(<MenuPage />),
      },
      {
        path: "/bebidas",
        element: createAdminRoute(<DrinksPage />),
      },
      {
        path: "/pedidos",
        element: createAdminRoute(<OrdersPage />),
      },
      {
        path: "/delivery",
        element: createAdminRoute(<DeliveryPage />),
      },
      {
        path: "/relatórios",
        element: createAdminRoute(<ReportsPage />),
      },
      {
        path: "/clientes",
        element: createAdminRoute(<CustomersPage />),
      },
      {
        path: "/fechamento",
        element: createAdminRoute(<EndOfDayPage />),
      },
      {
        path: "/Integrações",
        element: createAdminRoute(<IntegrationsPage />),
      },
      {
        path: "/pizza-ia",
        element: createAdminRoute(<IntegrationsPage />),
      },
      {
        path: "*",
        element: <Navigate to="/nao-encontrado" replace />,
      },
    ],
  },
];
