import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './App.css'
import Home from './Pages/Home'
import Login from "./components/auth/Login"
import SignUp from "./components/auth/SignUp"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react"

import { useDispatch } from "react-redux"
import { loadUser } from "./slices/user"
import ForgotPassword from "./components/auth/ForgotPassword"
import ResetPassword from "./components/auth/ResetPassword"
import ProfilePage from "./Pages/ProfilePage"
import { fetchCategoryProducts } from "./slices/product"
import Products from "./Pages/Products" 
 
import AdminDashboard from "./Pages/AdminDashboard"
 
import ProtectedRoute from "./Protected-routes/ProtectedUserRoute" 
import AdminProtectedRoute from "./Protected-routes/AdminProtectedRoute"
import { getAllCart } from "./slices/cart"
import CartPage from "./Pages/CartPage"
import ShippingPage from "./Pages/ShippingPage"
import ConfirmOrderPage from "./Pages/ConfirmOrderPage"
import PaymentPage from "./Pages/PaymentPage"
import SuccessOrder from "./Pages/SuccessOrder"
import AdminOrders from "./Pages/AdminOrders"
import AdminUsers from "./Pages/AdminUsers"
import AdminProducts from "./Pages/AdminProducts"
import AdminOrderDetailes from "./Pages/AdminOrderDetailes"
import ProductDetails from "./components/Route/ProductDetails"
import ProductDetailPage from "./Pages/ProductDetailPage"
import FaqPage from "./Pages/FaqPage"





function App() {
  const dispatch = useDispatch()

  useEffect(  ()=> {
  dispatch(loadUser())
  dispatch(fetchCategoryProducts())
  dispatch(getAllCart())
  }, [])

  return (
    <div className="overflow-x-hidden">
    <Router >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/gotocart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />}  />   
        <Route path="/resetPassword/:token" element={<ResetPassword />}  />   

        <Route path="/profile" element={
         <ProtectedRoute >
        <ProfilePage/>  
        </ProtectedRoute>
        } />
        <Route path="/products" element={<Products/>} />
        <Route path="/product/:id" element={<ProductDetailPage/>} />

        {/* order  */}
        <Route path="/order/shipping" element={
          <ProtectedRoute >
        <ShippingPage/>
        </ProtectedRoute>
        } />
        
        <Route path="/order/confirmOrder" element={<ConfirmOrderPage/>} />
        <Route path="/order/paymentStep" element={<PaymentPage/>} />
        <Route path="/orderSuccess" element={<SuccessOrder/>} /> 

        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute >
        <AdminDashboard />
        </AdminProtectedRoute>
        } />

        <Route path="/admin-orders" element={
          <AdminProtectedRoute >
        <AdminOrders />
        </AdminProtectedRoute>
        } />

        <Route path="/orderdetails/:id" element={
          <AdminProtectedRoute >
        <AdminOrderDetailes />
        </AdminProtectedRoute>
        } />
        <Route path="/admin-users" element={
          <AdminProtectedRoute >
        <AdminUsers />
        </AdminProtectedRoute>
        } />
        <Route path="/admin-products" element={
          <AdminProtectedRoute >
        <AdminProducts />
        </AdminProtectedRoute>
        } />

      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router> 
  </div>
  )
}

export default App
