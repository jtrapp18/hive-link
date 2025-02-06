// routes.js
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Hives from "./pages/Hives";
import MyEvents from "./pages/MyEvents";
import HiveDetails from "./pages/HiveDetails";
import AccountDetails from "./pages/AccountDetails";
import ErrorPage from "./pages/ErrorPage";
import Login from './pages/Login';
import Analysis from './pages/Analysis'
import BeekeepingNews from "./pages/BeekeepingNews";
import HiveMap from "./pages/HiveMap";
import MyForums from "./pages/MyForums";
import ForumDetails from "./pages/ForumDetails";

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
        path: "/about",
        element: <About />,
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
        path: "news",
        element: <BeekeepingNews />,
      },    
      {
        path: "hive_map",
        element: <HiveMap />,
      },       
      {
        path: "events",
        element: <MyEvents />,
      },
      {
        path: "hives",
        element: <Hives />,
      },
      {
        path: "hives/:id",
        element: <HiveDetails />,
      },
      {
        path: "forums",
        element: <MyForums />,
      },
      {
        path: "forums/:id",
        element: <ForumDetails />,
      },
      {
        path: "account_details",
        element: <AccountDetails />,
      }
    ],
  },
];

export default routes;
