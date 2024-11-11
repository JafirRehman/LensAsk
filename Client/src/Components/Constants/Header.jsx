import { FaCartShopping } from "react-icons/fa6";
import { useNavigate, Link, matchPath } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { userlogoutReducer } from "../../redux/Slices/UserSlice";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import "../../styles/Header.scss";
import toast from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const menuRef = useRef(null);
  const crossRef = useRef(null);
  useOnClickOutside([menuRef, crossRef], () => setShowMenu(false));

  async function logoutfunc() {
    if (!navigator.onLine) {
      toast.error("Oops, You are Offline!");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_BASE_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      dispatch(userlogoutReducer());
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const location = useLocation();
  const matchRoutes = (routes) => {
    return matchPath(routes, location.pathname);
  };

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  return (
    <header className="main-header sticky-header">
      <div className="header-content gap-2">
        <div
          className={`${
            !showMenu ? "hidden" : ""
          } h-screen z-20 fixed left-0 top-0 w-full bg-black/35 backdrop-blur-md`}
        >
          <div
            ref={menuRef} // Attach ref to the menu div
            className="w-[300px] bg-[#212121] h-full p-4"
          >
            <Link
              to="/"
              className={`${
                matchRoutes("/") && "text-ourred-500"
              } flex items-center text-3xl justify-center p-2 mb-2 rounded-lg border`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`${
                matchRoutes("/products") && " text-ourred-500"
              } flex items-center justify-center p-2 mb-2 rounded-lg border`}
            >
              All Products
            </Link>
            {userState.user && userState.user.role === "Admin" && (
              <>
                <Link
                  to="/user/allorders"
                  className={`${
                    matchRoutes("/user/allorders") && " text-ourred-500"
                  } flex items-center justify-center p-2 mb-2 rounded-lg border`}
                >
                  All Orders
                </Link>
                <Link
                  to="/user/createproduct"
                  className={`${
                    matchRoutes("/user/createproduct") && "text-ourred-500"
                  } flex items-center justify-center p-2 mb-2 rounded-lg border`}
                >
                  Create Product
                </Link>
              </>
            )}
            {userState.user && (
              <Link
                className={`flex items-center justify-center p-2 mt-7 rounded-lg border`}
                onClick={logoutfunc}
              >
                Logout
              </Link>
            )}
            {!userState.user && (
              <ul className="flex mt-7 gap-2 justify-end">
                <Link
                  to="/login"
                  className={`${
                    matchRoutes("/login") && "rounded-lg border text-ourred-500"
                  } flex-1 text-center p-2 mb-2 rounded-lg border`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`${
                    matchRoutes("/signup") && " text-ourred-500"
                  } flex-1 text-center p-2 mb-2 rounded-lg border`}
                >
                  SignUp
                </Link>
              </ul>
            )}
          </div>
        </div>
        <div className="h-full items-center flex" onClick={() => navigate("/")}>
          <img
            src="/assets/logo.png"
            className="w-[130px] m-0 mobile:w-[180px]"
          />
        </div>
        {userState.user && (
          <div className="justify-end gap-4 flex items-center flex-1 h-full">
            {userState.user.role !== "Admin" && (
              <Link
                className="hover:border-b-2 hover:opacity-[0.6]"
                to="/customer/cart"
              >
                <FaCartShopping className="text-ourred-50 w-6 h-6" />
              </Link>
            )}
            <Link
              to="/user/profile"
              className="flex items-center justify-between px-1 mobile:p-4"
            >
              <img
                src={userState.user.image}
                alt="Profile Picture"
                className="w-9 h-9 rounded-full"
              />
            </Link>
          </div>
        )}
        <div ref={crossRef}>
          <CiMenuFries
            onClick={() => setShowMenu((pre) => !pre)}
            className="h-8 w-8"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
