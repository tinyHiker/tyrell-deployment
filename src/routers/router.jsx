import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../pages/home/Home'
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import UserProfile from "../components/UserProfile";

import GenreCollection from "../pages/genres/GenreCollection";
import Collection from "../pages/genres/Collection";
import About from "../pages/about/About";
import Contact from "../pages/about/Contact";
import NotFound from "../pages/not-found/NotFound";
import FourOFour from "../pages/not-found/FourOFour";
import SubscribeSuccess from "../pages/success/SubscribeSuccess";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
            path: "/",
            element: < Home />
        },
        {
            path: "/orders",
            element: <PrivateRoute><OrderPage/></PrivateRoute>
            
        },
        
        {
            path: "/about",
            element: <About />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        }, 
        {
          path: "/cart",
          element: <CartPage />
        },
        {
          path: "/checkout",
          element: <PrivateRoute> <CheckoutPage /> </PrivateRoute>

        },
        {
          path: "/books/:id",
          element: <SingleBook />
        },
        {
          path: "/profile",
          element: <PrivateRoute><UserProfile /></PrivateRoute>
        },
        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: "/404",
          element: <FourOFour />

        },
        {
          path: "/subscribe-success",
          element: <SubscribeSuccess />
        }
        

        

      ]
    },
    {
      path: "/admin",
      element: <AdminLogin />
    },
    {
      path: "/categories",
      element: <App />,
      children: [
        {
          path: "none",
          element: <Collection />
        },
        
        {
            path: ":genre",
            element: <GenreCollection />
        },
        
      ]
    },
    {
      path: "/dashboard",
      element: <AdminRoute><DashboardLayout/></AdminRoute>,
      children: [
        {
          path: "",
          element: <AdminRoute><Dashboard /></AdminRoute>
        },
        {
          path: "add-new-book",
          element: <AdminRoute><AddBook /></AdminRoute>
        },{
          path: "edit-book/:id",
          element: <AdminRoute><UpdateBook /></AdminRoute>
        },
        {
          path: "manage-books",
          element: <AdminRoute><ManageBooks /></AdminRoute>
        }

      ]
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

export default router;