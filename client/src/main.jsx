import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Rootlayout from './components/layout/Rootlayout.jsx'
import Signin from './pages/Signin.jsx'
import SignUp from './pages/SignUp.jsx'
import About from './pages/About.jsx'
import Cart from './pages/Cart.jsx'
import Contact from './pages/Contact.jsx'
import Offers from './pages/Offers.jsx'
import Order from './pages/Order.jsx'
import Product from './pages/Product.jsx'
import Shop from './pages/Shop.jsx'
import SingleProduct from './pages/SingleProduct.jsx'
import Profile from './pages/Profile.jsx'
const router=createBrowserRouter([{
  path: "/",
  element: <Rootlayout/>,
  children: [{path: "/", element: <App/>,},
    {path: "/about",element: <About/>,},
    {path: "/cart",element : <Cart/>,},
    {path: "/Contact",element:<Contact/>,},
    {path: "/offers",element: <Offers/>},
    {path: "/orders",element: <Order/>,},
    {path: "/Product",element: <Product/>,},
    {path: "/shop", element: <Shop/>,},
    {path:  "/singleproduct",element:<SingleProduct/>},,
    {path: "/signin",element: <Signin/>,},
    {path: "/signup",element: <SignUp/>,},
    {path: "/profile",element: <Profile/>,},
    {path: "/product/:id",element :<SingleProduct/>}

  ],
}]);
createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}/>
)
