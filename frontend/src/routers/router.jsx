import { createBrowserRouter } from "react-router-dom";

import App from "../App.jsx";

import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import Cart from "../pages/books/Cart.jsx";
import CheckOut from "../pages/books/CheckOut.jsx";
import SingleBook from "../pages/books/SingleBook.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Home from "../pages/home/Home.jsx";
import OrderPage from "../pages/books/OrderPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
      },
      { path: "/about", element: <div>About</div> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckOut />
          </PrivateRoute>
        ),
      },
      { path: "/books/:id", element: <SingleBook /> },
    ],
  },
]);

export default router;
