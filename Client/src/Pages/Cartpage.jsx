import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../Components/CartItem";
import { useNavigate } from "react-router-dom";
const Cartpage = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const userState = useSelector((state) => state.user);
  const user = userState?.user;

  useEffect(() => {
    setTotalAmount(user?.cart?.reduce((previous, item) => previous + parseInt(item.price), 0))
  }, [userState])

  const navigate=useNavigate()
  useEffect(() => {
    if(!userState?.user) {
      navigate('/login')
    }
  })
  return (
    <div>
      {
        user && user.cart.length > 0 && (
          <div className="flex gap-16 max-w-6xl p-6 mx-auto flex-wrap lg:flex-nowrap">
            <div className="lg:w-[70%]">
              {
                user.cart.map((item, index) => {
                  return <CartItem key={item._id} item={item} itemIndex={index} />
                })
              }
            </div>
            <div className="md:w-[30%] w-full flex flex-col gap-8 justify-between">

              <div className="mt-20">
                <p className="text-xl text-[#166534] uppercase font-[600]">Your Cart</p>
                <p className="text-5xl font-[600] text-[#15803d] uppercase mb-4">Summary</p>
                <p className="font-[600] text-xl text-slate-700">
                  Total Items: <span className="font-normal">{user.cart.length}</span>
                </p>
              </div>

              <div className="mb-20">
                <p className="text-slate-700 text-xl font-[600] mb-5 ">Total Amount:
                  <span className="font-bold ml-2 text-black">${totalAmount}</span>
                </p>
                <button onClick={()=> navigate('/user/cart/order')} className="bg-[#16a34a] text-white text-md uppercase font-[600] py-3 px-10 rounded-md border-[#16a34a] border-2 hover:bg-white hover:scale-75 transition-all duration-300">
                  CheckOut Now
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