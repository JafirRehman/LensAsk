import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../../styles/Header.scss";
import { useSelector, useDispatch } from "react-redux";
import { userlogoutReducer } from "../../redux/Slices/UserSlice";
import toast from "react-hot-toast";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

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
  return (
    <>
      <header className="main-header sticky-header">
        <div className="header-content">
          <ul className="left">
            <li className="hover:border-b-2" onClick={() => navigate("/")}>
              Home
            </li>
            <li
              className="hover:border-b-2"
              onClick={() => navigate("/products")}
            >
              All Products
            </li>
            {userState.user && userState.user.role === "Admin" && (
              <>
                <li
                  className="hover:border-b-2 hover:opacity-[0.6]"
                  onClick={() => navigate("/user/allorders")}
                >
                  All Orders
                </li>
                <li
                  className="hover:border-b-2 hover:opacity-[0.6]"
                  onClick={() => navigate("/user/createproduct")}
                >
                  Create Product
                </li>
              </>
            )}
          </ul>
          <div className="center" onClick={() => navigate("/")}>
            <img src="/assets/logo.png" width={250} />
          </div>
          {userState.user && (
            <div className="right cursor-pointer">
              <button
                className="hover:border-b-2 hover:opacity-[0.6]"
                onClick={logoutfunc}
              >
                Logout
              </button>
              {userState.user.role !== "Admin" && (
                <button
                  className="hover:border-b-2 hover:opacity-[0.6]"
                  onClick={() => navigate("/customer/cart")}
                >
                  <FaCartShopping className="text-ourred-50" />
                </button>
              )}
              <button
                onClick={() => navigate("/user/profile")}
                className="flex items-center justify-between p-4 bg-zinc-200 dark:bg-zinc-800"
              >
                <img
                  src={userState.user.image}
                  alt="Profile Picture"
                  className="w-10 h-10 rounded-full"
                />
              </button>
            </div>
          )}
          {!userState.user && (
            <ul className="right cursor-pointer">
              <li
                className="hover:border-b-2 hover:opacity-[0.6]"
                onClick={() => navigate("/login")}
              >
                Login
              </li>
              <li
                className="hover:border-b-2 hover:opacity-[0.6]"
                onClick={() => navigate("/signup")}
              >
                Signup
              </li>
            </ul>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
