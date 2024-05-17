import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addtocartThunk } from '../redux/Slices/UserSlice';
import { removefromcartThunk } from '../redux/Slices/UserSlice';
import { differenceInHours, parseISO } from 'date-fns';

const Product = ({ post }) => {
    const userState = useSelector((state) => state.user);
    const usercart = userState.user.cart;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCart = (productId) => {
        if (userState.user) {
            dispatch(addtocartThunk(productId));
        } else {
            toast.error("Please login to add items to cart");
            navigate("/login");
        }
    }
    const removefromCart = (productId) => {
        if (userState.user) {
            dispatch(removefromcartThunk(productId));
        } else {
            toast.error("Please login to remove items from cart");
            navigate("/login");
        }
    }

    return (
        <div className="flex flex-col items-center justify-between w-full gap-3 p-2 rounded-xl  shadow-lg hover:shadow-2xl hover:scale-[1.03] md:hover:scale-[1.05] transition ease-in">
            <div className="h-[180px] relative">
                <img src={post.image} className="mix-blend-multiply h-full w-full" alt="" />
                {
                    differenceInHours(new Date(), parseISO(post.createdAt)) <= 24 &&
                    <div className="absolute rounded-full top-5 right-2 bg-[#60d400] text-ourred-50 animate-bounce text-white px-2 py-1 z-10 text-xs font-bold uppercase">New</div>
                }
            </div>
            <div>
                <p className="text-[#1d783e] font-semibold text-lg text-left truncate w-40 mt-1">
                    {post.title}
                </p>
            </div>
            <div>
                <p className="w-40 text-gray-400 font-normal text-[10px] text-left">
                    {post.description.split(" ").slice(0, 10).join(" ") + "..."}
                </p>
            </div>
            <div className="flex justify-between items-center w-full mt-5">
                <div>
                    <p className="text-green-600 font-semibold">${post.price}</p>
                </div>
                {
                    usercart?.length > 0 && usercart?.some((pro) => pro._id === post._id) ?
                        (<button
                            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
                            onClick={() => { removefromCart(post._id) }}>
                            Remove&nbsp;Item
                        </button>) :
                        (<button
                            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
                            onClick={() => { addToCart(post._id) }}>
                            Add&nbsp;to&nbsp;Cart
                        </button>)
                }
            </div>
        </div>
    );
};

export default Product;
