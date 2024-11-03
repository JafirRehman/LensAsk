/* eslint-disable react/prop-types */
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spinner from "./Spinner";
import { useState } from "react";
import { updateuser } from "../redux/Slices/UserSlice";

const CartItem = ({ item }) => {
  const [removeloading, setRemoveloading] = useState(false);
  const [addloading, setAddloading] = useState(false);
  const [reduceloading, setReduceloading] = useState(false);

  const userState = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeItemfromCart = async (productId) => {
    if (userState.user) {
      setRemoveloading(true);
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
        setRemoveloading(false);
      }
    } else {
      toast.error("Login First!");
      navigate("/login");
    }
  };

  const reduceItemQuantity = async (productId) => {
    if (userState.user) {
      setReduceloading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BACKEND_BASE_URL
          }/customer/reducequantity`,
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
      } catch (error) {
        toast.error(error.message);
      } finally {
        setReduceloading(false);
      }
    } else {
      toast.error("Login First!");
      navigate("/login");
    }
  };

  const addToCart = async (productId) => {
    if (userState.user) {
      setAddloading(true);
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
      } catch (error) {
        toast.error(error.message);
      } finally {
        setAddloading(false);
      }
    } else {
      toast.error("Login First!");
      navigate("/login");
    }
  };
  return (
    <div className="p-4 border-b-2 last:border-none border-slate-700">
      <div className="flex justify-between items-center py-3.5 px-2.5 gap-14 flex-col md:flex-row">
        <div className="md:w-[30%] w-full flex justify-center items-center">
          <img
            src={item.product.image}
            alt="product image"
            className="w-[40%] max-h-[200px] md:w-[50%] lg:w-full"
          />
        </div>
        <div className="md:w-[70%] w-full flex flex-col gap-5">
          <h1 className="text-xl font-[600] text-slate-700">
            {item.product.title}
          </h1>
          <div className="flex justify-between items-center">
            <p className="font-bold text-[#16a34a] text-lg">
              Rs. <span className="text-[#0E0E11]">{item.product.price}</span>
            </p>
            <div className="flex gap-5 justify-center items-center">
              <button
                onClick={() => reduceItemQuantity(item.product._id)}
                className="bg-[#F1F2F3] w-[38px] text-[1.5rem] font-bold rounded-full"
              >
                {reduceloading ? <Spinner status={true} /> : "-"}
              </button>
              <h5>{item.quantity}</h5>
              <button
                onClick={() => addToCart(item.product._id)}
                className="bg-[#F1F2F3] w-[38px] text-[1.5rem] font-bold rounded-full"
              >
                {addloading ? <Spinner status={true} /> : "+"}
              </button>
            </div>
            <button
              onClick={() => {
                removeItemfromCart(item.product._id);
              }}
              className="p-2 rounded-full bg-ourred-700 flex justify-center items-center hover:bg-red-400 group transition-all"
            >
              {removeloading ? (
                <Spinner status={true} />
              ) : (
                <MdDeleteSweep className="text-ourred-50 text-[20px]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
