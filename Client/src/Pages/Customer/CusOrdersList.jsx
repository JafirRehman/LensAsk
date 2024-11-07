//done
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../Components/Constants/Spinner";
import Ordercomponent from "../../Components/Constants/Ordercomponent";
const CusOrdersList = () => {
  const [isloading, setIsloading] = useState(false);
  const [orders, setOrders] = useState([]);

  async function fetchProductData() {
    setIsloading(true);
    if (!navigator.onLine) {
      toast.error("Oops, You are Offline!");
      setIsloading(false);
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BACKEND_BASE_URL}/customer/getuserorders`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      setOrders(data.orders);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <>
      {isloading ? (
        <Spinner />
      ) : orders.length === 0 ? (
        <div className="h-screen flex mt-28 justify-center bg-zinc-100 dark:bg-zinc-900">
          <p className="bg-[#F1F2F3] self-start p-5 text-2xl text-center">
            There Are No Orders!
          </p>
        </div>
      ) : (
        <div>
          {orders.map((order) => {
            return <Ordercomponent key={order._id} order={order} />;
          })}
        </div>
      )}
    </>
  );
};

export default CusOrdersList;
