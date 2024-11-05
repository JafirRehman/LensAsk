/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { differenceInHours, parseISO } from "date-fns";
import Spinner from "../Constants/Spinner";
import { useState } from "react";
import { updateuser } from "../../redux/Slices/UserSlice";

const Product = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const userState = useSelector((state) => state.user);
  const usercart = userState.user.cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    if (userState.user) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BACKEND_BASE_URL}/customer/addtocart`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }),
          }
        );
        const data = await response.json();
        dispatch(updateuser(data.existeduser));
        toast.success("Product Added Successfully!");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Login First!");
    }
  };

  const removefromCart = async (productId) => {
    if (userState.user) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BACKEND_BASE_URL
          }/customer/removefromcart`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId }),
          }
        );
        const data = await response.json();
        dispatch(updateuser(data.existeduser));
        toast.success("Product Removed Successfully!");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Login First!");
    }
  };

  return (
    <div className="flex flex-col w-[261px] max-w-[261px] gap-3 hover:shadow-2xl hover:scale-[1.03] md:hover:scale-[1.05] transition ease-in">
      <div className="bg-[#F2F2F2] h-[300px] relative flex items-center justify-center">
        <img
          src={post.image}
          className="opacity-100 hover:opacity-0 mix-blend-multiply h-[170px] w-[170px]"
          alt=""
        />
        {differenceInHours(new Date(), parseISO(post.createdAt)) <= 24 && (
          <div className=" absolute rounded-full top-5 right-2 bg-[#0E0E11] text-ourred-50 animate-bounce text-white px-2 py-1 z-10 text-xs font-bold uppercase">
            New
          </div>
        )}
        <div className="absolute opacity-0 hover:opacity-100 backdrop-blur-md bg-white/30 flex flex-col gap-5 justify-center items-center w-full h-full">
          <button
            onClick={() => navigate(`/productsdetails/${post._id}`)}
            className="text-gray-700 border-2 border-gray-700 rounded-md font-semibold text-[12px] h-10 w-40 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
          >
            Details
          </button>
          {userState.user.role !== "Admin" &&
            (usercart?.length > 0 &&
            usercart?.some((pro) => pro.product._id === post._id) ? (
              <button
                className="text-gray-700 border-2 border-gray-700 rounded-md font-semibold text-[12px] h-10 w-40 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
                onClick={() => {
                  removefromCart(post._id);
                }}
              >
                {isLoading ? <Spinner status={true} /> : "Remove Item"}
              </button>
            ) : (
              <button
                className="text-gray-700 border-2 border-gray-700 rounded-md font-semibold text-[12px] h-10 w-40 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
                onClick={() => {
                  addToCart(post._id);
                }}
              >
                {isLoading ? <Spinner status={true} /> : "Add to Cart"}
              </button>
            ))}
        </div>
      </div>
      <div className="text-[1rem]">
        <p className="font-bold  text-left truncate mt-1">{post.title}</p>
        <p className="text-green-600 font-semibold">Rs. {post.price}</p>
      </div>
    </div>
  );
};

export default Product;
