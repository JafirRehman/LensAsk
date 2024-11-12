/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { differenceInHours, parseISO } from "date-fns";
import { IoAddOutline } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { useState } from "react";
import { updateuser } from "../../redux/Slices/UserSlice";
import Spinner from "../Constants/Spinner";
import toast from "react-hot-toast";

const Product = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const userState = useSelector((state) => state.user);
  const usercart = userState.user.cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    setIsLoading(true);
    if (!navigator.onLine) {
      toast.error("Oops, You are Offline!");
      setIsLoading(false);
      return;
    }
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
      if (!data.success) {
        throw new Error(data.message);
      }
      dispatch(updateuser(data.existeduser));
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removefromCart = async (productId) => {
    setIsLoading(true);
    if (!navigator.onLine) {
      toast.error("Oops, You are Offline!");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_BASE_URL}/customer/removefromcart`,
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
      if (!data.success) {
        throw new Error(data.message);
      }
      dispatch(updateuser(data.existeduser));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col rounded w-[261px] max-w-[261px] gap-3 hover:shadow-2xl hover:scale-[1.03] md:hover:scale-[1.05] transition ease-in">
      <div className="bg-[#F2F2F2] rounded h-[300px] relative flex items-center justify-center">
        <img src={post.image} className="h-[170px] w-[170px]" alt="" />
        {differenceInHours(new Date(), parseISO(post.createdAt)) <= 24 && (
          <div className="rounded absolute top-4 left-2 bg-ourred-700 text-ourred-50 animate-bounce px-2 py-1 z-10 text-xs font-bold uppercase">
            New
          </div>
        )}
        {userState?.user?.role !== "Admin" && userState && (
          <button
            className="rounded-full text-black absolute top-3 right-3 bg-white flex items-center justify-center z-10 text-xs w-8 h-8"
            onClick={() => {
              const isproduct = usercart?.some(
                (pro) => pro?.product?._id === post._id
              );
              isproduct ? removefromCart(post._id) : addToCart(post._id);
            }}
          >
            {isLoading ? (
              <Spinner status={true} />
            ) : usercart?.some((pro) => pro?.product?._id === post._id) ? (
              <FiMinus className="text-base text-ourred-700 font-bold" />
            ) : (
              <IoAddOutline className="text-base text-ourred-700 font-bold" />
            )}
          </button>
        )}
        <button
          onClick={() => navigate(`/productsdetails/${post._id}`)}
          className={`${
            userState?.user?.role === "Admin" ? "top-3" : "top-16"
          } rounded-full text-black absolute top-16 right-3 bg-white flex items-center justify-center z-10 text-xs w-8 h-8`}
        >
          <FiEye className="text-base font-bold" />
        </button>
      </div>
      <div className="text-[1rem]">
        <p className="font-bold  text-left truncate mt-1">{post.title}</p>
        <p className="text-ourred-700 font-semibold">Rs. {post.price}</p>
      </div>
    </div>
  );
};

export default Product;
