import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Login from "@/pages/Login";
import { CartProvider } from "@/context/CartContext";
import Cart from "@/pages/Cart";
import { SessionProvider } from "./context/SessionContext";
import Admin from "@/pages/admin/Admin";
import { useLocation } from "react-router-dom";
import Register from "@/pages/Register";
import { ProductProvider } from "./context/ProductContext";
import ConfirmOrder from "@/pages/ConfirmOrder";
import { AdminProtectedRoutes } from "./components/AdminProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { CheckoutProvider } from "./context/CheckoutContext";
import Checkout from "./pages/Checkout";
import { UserProtectedRoutes } from "./components/UserProtectedRoutes";
import { OrderProvider } from "./context/OrderContext";
import Payment from "./components/Payment";
import OrderFailed from "./components/OrderFailed";

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.includes("/admin");

  return (
    <SessionProvider>
      <ProductProvider>
        <OrderProvider>
          <CartProvider>
            <CheckoutProvider>
              <>
                <Navbar />
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/account/login" element={<Login />} />
                  <Route path="/account/register" element={<Register />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/order/:orderId" element={<ConfirmOrder />} />
                  <Route path="/order/failed" element={<OrderFailed />} />
                  <Route
                    path="/checkout"
                    element={
                      <UserProtectedRoutes>
                        <Checkout />
                      </UserProtectedRoutes>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <AdminProtectedRoutes>
                        <Admin />
                      </AdminProtectedRoutes>
                    }
                  />
                  <Route path="/payment" element={<Payment />} />
                </Routes>
                <Footer className="mt-auto" />

                <Toaster />
              </>
            </CheckoutProvider>
          </CartProvider>
        </OrderProvider>
      </ProductProvider>
    </SessionProvider>
  );
}

export default App;
