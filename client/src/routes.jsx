// routes.js
import App from "./App";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import CookieListing from "./pages/CookieListing";
import AccountDetails from "./pages/AccountDetails";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/OrderHistory";
import ErrorPage from "./pages/ErrorPage";
import Login from './pages/Login';
import Checkout from "./pages/Checkout";

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
        path: "menu",
        element: <Menu />,
      },
      {
        path: "menu/:id",
        element: <CookieListing />,
      },
      {
        path: "account_details",
        element: <AccountDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order_history",
        element: <OrderHistory />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
];

export default routes;
