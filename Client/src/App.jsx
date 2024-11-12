import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home.jsx";
import Products from "./Pages/Products/Products.jsx";
import Loginpage from "./Pages/Auth/Loginpage.jsx";
import Signuppage from "./Pages/Auth/Signuppage.jsx";
import Cartpage from "./Pages/Customer/Cartpage.jsx";
import Profilepage from "./Pages/User/Profilepage.jsx";
import Orderspage from "./Pages/Admin/Orderspage.jsx";
import Createproductpage from "./Pages/Admin/Createproductpage.jsx";
import ProductDetails from "./Pages/Products/ProductDetails.jsx";
import Transectionfail from "./Pages/Stripe/Transectionfail.jsx";
import Transectionsuccess from "./Pages/Stripe/Transectionsuccess.jsx";
import ProtectedRoutes from "./middlewares/ProtectedRoutes.jsx";
import AdminRoutes from "./middlewares/AdminRoutes.jsx";
import ProtectedAuthRoutes from "./middlewares/ProtectedAuthRoutes.jsx";
import Header from "./Components/Constants/Header.jsx";
import Footer from "./Components/Constants/Footer.jsx";
import ScrollToTop from "./Components/Constants/ScrollToTop.jsx";
import Newsletter from "./Components/Constants/Newsletter.jsx";
import Error from "./Components/Constants/Error.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster />
      <Header />
      <Routes>
        {/** PUBLIC ROUTES */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route
          exact
          path="/productsdetails/:productid"
          element={<ProductDetails />}
        />
        <Route exact path="/success" element={<Transectionsuccess />} />
        <Route exact path="/cancel" element={<Transectionfail />} />
        {/** cant be accessed when user is loged in */}
        <Route path="" element={<ProtectedAuthRoutes />}>
          <Route exact path="/login" element={<Loginpage />} />
          <Route exact path="/signup" element={<Signuppage />} />
        </Route>
        {/** user should be loged in to access these routes */}
        <Route path="" element={<ProtectedRoutes />}>
          <Route exact path="/user/profile" element={<Profilepage />} />
          <Route exact path="/customer/cart" element={<Cartpage />} />
        </Route>
        {/** user should be admin to access these routes */}
        <Route path="" element={<AdminRoutes />}>
          <Route exact path="/user/allorders" element={<Orderspage />} />
          <Route
            exact
            path="/user/createproduct"
            element={<Createproductpage />}
          />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Newsletter />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
