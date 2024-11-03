import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Header from "./Constants/Header.jsx";
import Footer from "./Constants/Footer.jsx";
import Products from "./Pages/Products.jsx";
import { Toaster } from "react-hot-toast";
import Loginpage from "./Pages/Loginpage.jsx";
import Signuppage from "./Pages/Signuppage.jsx";
import Cartpage from "./Pages/Cartpage.jsx";
import Profilepage from "./Pages/Profilepage.jsx";
import { useSelector } from "react-redux";
import Adminheader from "./Components/Admin/Adminheader.jsx";
import Orderspage from "./Pages/Admin/Orderspage.jsx";
import CreateOrderpage from "./Pages/Customer/CreateOrderpage.jsx";
import Createproductpage from "./Pages/Admin/Createproductpage.jsx";
import ScrollToTop from "./Constants/ScrollToTop.jsx";
import Newsletter from "./Constants/Newsletter.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Transectionfail from "./Pages/Transectionfail.jsx";

const App = () => {
  const userState = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster />
      {userState && userState.user?.role === "Admin" ? (
        <Adminheader />
      ) : (
        <Header />
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route
          exact
          path="/productsdetails/:productid"
          element={<ProductDetails />}
        />
        <Route exact path="/login" element={<Loginpage />} />
        <Route exact path="/signup" element={<Signuppage />} />
        <Route exact path="/customer/cart" element={<Cartpage />} />
        <Route exact path="/user/profile" element={<Profilepage />} />
        <Route exact path="/user/allorders" element={<Orderspage />} />
        <Route
          exact
          path="/user/cart/order/success"
          element={<CreateOrderpage />}
        />
        <Route
          exact
          path="/user/cart/order/failure"
          element={<Transectionfail />}
        />
        <Route
          exact
          path="/user/createproduct"
          element={<Createproductpage />}
        />
      </Routes>
      <Newsletter />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
