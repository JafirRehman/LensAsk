import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../Components/Constants/Spinner";
import Ordercomponent from "../../Components/Constants/Ordercomponent";
const CusOrderspage = () => {
  const [isloading, setIsloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orders, setOrders] = useState([]);

  async function fetchProductData() {
    setIsloading(true);

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
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
        setSuccess(data.success);
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <>
      {isloading && <Spinner />}
      {isloading === false && orders.length === 0 && (
        <div className="h-screen flex mt-28 justify-center bg-zinc-100 dark:bg-zinc-900">
          <p className="bg-[#F1F2F3] self-start p-5 text-2xl text-center">
            There Are No Orders!
          </p>
        </div>
      )}
      {success && isloading === false && orders.length > 0 && (
        <div>
          {orders.map((order) => {
            return <Ordercomponent key={order._id} order={order} />;
          })}
        </div>
      )}
    </>
  );
};

export default CusOrderspage;
