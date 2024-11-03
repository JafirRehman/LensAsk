import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Logoimg from "../assets/logo.png"
import '../styles/Header.scss';
import { useSelector, useDispatch } from "react-redux";
import { userlogoutReducer } from "../redux/Slices/UserSlice";

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userState = useSelector(state => state.user)

    function logoutfunc() {
        dispatch(userlogoutReducer())
        navigate("/login")
    }
    return (
        <>
            <header
                className="main-header sticky-header">
                <div className="header-content">
                    <ul className="left">
                        <li className="hover:border-b-2" onClick={() => navigate("/")}>Home</li>
                        <li className="hover:border-b-2" onClick={() => navigate('/products')}>All Products</li>
                    </ul>
                    <div className="center" onClick={() => navigate("/")}>
                        <img src={Logoimg} width={250} />
                    </div>
                    {userState.user &&
                        <div className="right cursor-pointer">
                            <button className="hover:border-b-2 hover:opacity-[0.6]" onClick={logoutfunc}>Logout</button>
                            <button className="hover:border-b-2 hover:opacity-[0.6]" onClick={() => navigate("/customer/cart")}><FaCartShopping className="text-ourred-50" /></button>
                            <button onClick={()=> navigate("/user/profile")} className="flex items-center justify-between p-4 bg-zinc-200 dark:bg-zinc-800">
                                <img src={userState.user.image} alt="Profile Picture" className="w-10 h-10 rounded-full" />
                            </button>
                        </div>
                    }
                    {!userState.user &&
                        <ul className="right cursor-pointer">
                            <li className="hover:border-b-2 hover:opacity-[0.6]" onClick={() => navigate("/login")}>Login</li>
                            <li className="hover:border-b-2 hover:opacity-[0.6]" onClick={() => navigate("/signup")}>Signup</li>
                        </ul>
                    }
                </div>
            </header>
        </>
    );
};

export default Header;
