// routes.js
import App from "./App";
import Home from "./pages/Home";
import Hives from "./pages/Hives";
import HiveDetails from "./pages/HiveDetails";
import AccountDetails from "./pages/AccountDetails";
import ErrorPage from "./pages/ErrorPage";
import Login from './pages/Login';
import Analysis from './pages/Analysis'
import HiveInspections from "./pages/HiveInspections";
import HiveQueens from './pages/HiveQueens'

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "analysis",
        element: <Analysis />,
      },
      {
        path: "hives",
        element: <Hives />,
      },
      {
        path: "hive/:id",
        element: <HiveDetails />,
      },
      {
        path: "inspections/:id",
        element: <HiveInspections />,
      },
      {
        path: "queens/:id",
        element: <HiveQueens />,
      },
      {
        path: "account_details",
        element: <AccountDetails />,
      }
    ],
  },
];

export default routes;
