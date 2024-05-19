import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addtocartThunk } from '../redux/Slices/UserSlice';
import { removefromcartThunk } from '../redux/Slices/UserSlice';
import { differenceInHours, parseISO } from 'date-fns';
import Spinner from './Spinner';

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
        <div className="flex flex-col w-[261px] max-w-[261px] gap-3 hover:shadow-2xl hover:scale-[1.03] md:hover:scale-[1.05] transition ease-in">
            <div className="bg-[#F2F2F2] h-[300px] relative flex items-center justify-center">
                <img src={post.image} className="opacity-100 hover:opacity-0 mix-blend-multiply h-[170px] w-[170px]" alt="" />
                {
                    differenceInHours(new Date(), parseISO(post.createdAt)) <= 24 &&
                    <div className=" absolute rounded-full top-5 right-2 bg-[#0E0E11] text-ourred-50 animate-bounce text-white px-2 py-1 z-10 text-xs font-bold uppercase">New</div>
                }
                <div className="absolute opacity-0 hover:opacity-100 backdrop-blur-md bg-white/30 flex flex-col gap-5 justify-center items-center w-full h-full">
                    <button onClick={() => navigate(`/productsdetails/${post._id}`)} className='text-gray-700 border-2 border-gray-700 rounded-md font-semibold text-[12px] h-10 w-40 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in'>Details</button>
                    {
                        userState.user.role !== 'Admin' && (
                            usercart?.length > 0 && usercart?.some((pro) => pro._id === post._id) ?
                                (<button
                                    className="text-gray-700 border-2 border-gray-700 rounded-md font-semibold text-[12px] h-10 w-40 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
                                    onClick={() => { removefromCart(post._id) }}>
                                    {userState && userState.isLoading ? <Spinner status={true} /> : "Remove Item"}
                                </button>) :
                                (<button
                                    className="text-gray-700 border-2 border-gray-700 rounded-md font-semibold text-[12px] h-10 w-40 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
                                    onClick={() => { addToCart(post._id) }}>
                                    {userState && userState.isLoading ? <Spinner status={true} /> : "Add to Cart"}
                                </button>)
                        )
                    }

                </div>
            </div>
            <div className='text-[1rem]'>
                <p className="font-bold  text-left truncate mt-1">
                    {post.title}
                </p>
                <p className="text-green-600 font-semibold">Rs. {post.price}</p>
            </div>
        </div>
    );
};

export default Product;

/**<div className="absolute bg-ourred-500 flex justify-between items-center w-full h-full">
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
            </div> */