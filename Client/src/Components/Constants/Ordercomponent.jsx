/* eslint-disable react/prop-types */
import { differenceInHours, parseISO } from "date-fns";
const Ordercomponent = ({ order }) => {
  return (
    <div className="bg-[#F2F1F3] max-w-[90%] mx-auto mobile:p-10 mt-10 mb-10 bg-white dark:bg-zinc-800 p-4">
      <div className="flex relative items-center justify-between mb-4">
        {differenceInHours(new Date(), parseISO(order.createdAt)) <= 24 && (
          <div className=" absolute rounded-full -top-6 -left-8 bg-[#0E0E11] text-ourred-50 animate-bounce px-2 py-2 z-10 text-xs font-bold uppercase">
            New
          </div>
        )}
        <h2 className="text-lg">
          <span className="text-[1.4rem] font-bold">Order ID:</span> #
          {order._id}
        </h2>
        <span className="text-zinc-500 dark:text-zinc-400">
          Total Price: Rs. {order.totalPrice}
        </span>
      </div>
      {order.products.map((pro) => (
        <div key={pro.product._id} className="flex items-center mb-4">
          <img
            src={pro.product.image}
            alt="Product Image"
            className="w-12 h-12 rounded-lg mr-2"
          />
          <div>
            <h3 className="text-sm font-semibold">
              Product Name: {pro.product.title}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              Product ID: {pro.product._id}
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">
              Price: Rs. {pro.product.price}
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">
              Quantity: {pro.quantity}
            </p>
          </div>
        </div>
      ))}
      <div className="mt-4">
        <h3 className="text-[1.3rem] font-bold">Receiver Details</h3>
        <p className="text-zinc-500 dark:text-zinc-400 capitalize">
          Receiver Name: {order.receiverName}
        </p>
        <p className="text-zinc-500 dark:text-zinc-400">
          Phone Number: {order.phoneNumber}
        </p>
        <p className="text-zinc-500 dark:text-zinc-400">Email: {order.email}</p>
        <p className="text-zinc-500 dark:text-zinc-400">
          Address: {order.address}
        </p>
      </div>
    </div>
  );
};

export default Ordercomponent;
