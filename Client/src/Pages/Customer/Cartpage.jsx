import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import CartItem from "../../Components/Cart/CartItem";
import Spinner from "../../Components/Constants/Spinner";
const Cartpage = () => {
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const userState = useSelector((state) => state.user);
  const user = userState?.user;

  useEffect(() => {
    setTotalAmount(
      user?.cart?.reduce(
        (previous, item) =>
          previous + parseInt(item.product.price) * item.quantity,
        0
      )
    );
  }, [userState]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userState?.user) {
      navigate("/login");
    }
  });

  async function makepayment() {
    setLoading(true);
    const stripe = await loadStripe(
      "pk_test_51PKkDASBSYlvW4A9uaNq5i9QnBeJsdVC4XZnBZooG2uVUP19buHVpimgjTbDA2VLNsRBv2Anax8IhX9XjwQ7hpVn003bEam70J"
    );

    const response = await fetch("http://localhost:5000/customer/cartsession", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messege: "cart session" }),
    });
    if (response.ok) {
      const session = await response.json();
      // eslint-disable-next-line no-unused-vars
      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } else {
      console.log(response);
      toast.error("something went wrong");
    }
    setLoading(false);
  }

  return (
    <div>
      {user && user.cart.length > 0 && (
        <div className="flex gap-16 max-w-6xl p-6 mx-auto flex-wrap lg:flex-nowrap">
          <div className="lg:w-[70%]">
            {user.cart.map((item, index) => {
              return <CartItem key={item._id} item={item} itemIndex={index} />;
            })}
          </div>
          <div className="md:w-[30%] w-full flex flex-col gap-8 justify-between">
            <div className="mt-20">
              <p className="text-xl text-[#0E0E11] uppercase font-[600]">
                Your Cart
              </p>
              <p className="text-5xl font-[600] text-[#0E0E11] uppercase mb-4">
                Summary
              </p>
              <p className="font-[600] text-xl text-slate-700">
                Total Items:{" "}
                <span className="font-normal">{user.cart.length}</span>
              </p>
              <p className="mt-5 text-slate-700 text-xl font-[600] mb-5 ">
                Total Amount:
                <span className="font-bold ml-2 text-[#16a34a]">
                  Rs. <span className="text-[#0E0E11]">{totalAmount}</span>
                </span>
              </p>
              <button
                onClick={makepayment}
                className="bg-[#0E0E11] text-ourred-50 text-md uppercase font-[600px] py-3 px-10 rounded-md hover:scale-90 transition-all duration-300"
              >
                {loading ? <Spinner status={true} /> : "CheckOut Now"}
              </button>
            </div>
          </div>
        </div>
      )}
      {user && user.cart.length === 0 && (
        <div className="w-screen h-[calc(100vh-80px)] flex flex-col gap-6 justify-center items-center">
          <h1 className="font-[600] text-xl">Your Cart is Empty !</h1>
          <Link to={"/products"}>
            <button className="bg-[#16a34a] text-white text-md uppercase font-[600] py-3 px-10 rounded-md border-[#16a34a] border-2 hover:bg-white hover:scale-75 transition-all duration-300">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cartpage;
