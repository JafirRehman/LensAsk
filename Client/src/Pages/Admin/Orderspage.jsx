// Done
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import Spinner from "../../Components/Constants/Spinner";
import Ordercomponent from "../../Components/Constants/Ordercomponent";

const Orderspage = () => {
  const [isloading, setIsloading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchProductData() {
      setIsloading(true);
      if (!navigator.onLine) {
        toast.error("Oops, You are Offline!");
        setIsloading(false);
        return;
      }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BACKEND_BASE_URL}/admin/getallorders`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message);
        }
        setOrders(data.orders);
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Something went wrong!");
      } finally {
        setIsloading(false);
      }
    }
    fetchProductData();
  }, []);

  return (
    <>
      {isloading ? (
        <Spinner />
      ) : orders?.length === 0 ? (
        <div className="h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
          <p className="bg-[#F1F2F3] p-5 text-2xl text-center">
            There Are No Orders!
          </p>
        </div>
      ) : (
        <div>
          {orders?.map((order) => {
            return <Ordercomponent key={order._id} order={order} />;
          })}
        </div>
      )}
    </>
  );
};

export default Orderspage;
