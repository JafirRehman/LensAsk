/* eslint-disable react/prop-types */

const Ordercomponent = ({ order }) => {
  return (
    <div className="p-4 sm:p-6 bg-white text-gray-800 rounded-lg shadow-md max-w-full sm:max-w-[90%] max-sm:mx-3 mx-auto mt-10 mb-10">
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
        <h2 className="text-md sm:text-lg font-semibold">
          Order ID: <span className="text-blue-600">#{order._id}</span>
        </h2>
        <span className="font-medium text-sm sm:text-base">
          Total Price: Rs. {order.totalPrice}
        </span>
      </div>

      {/* Items Section */}
      <div className="mt-4 border-t border-gray-300 pt-4">
        <h3 className="text-md font-semibold mb-2">Items:</h3>
        {order.products.map((pro) => (
          <div
            key={pro.product._id}
            className="flex flex-col sm:flex-row items-start sm:items-center bg-gray-50 rounded-lg p-3 sm:p-4 mb-3 shadow-sm"
          >
            <img
              src={pro.product.image}
              alt="Product"
              className="w-20 h-20 rounded-lg mb-2 sm:mb-0 sm:mr-4"
            />
            <div className="flex-1 space-y-1 sm:space-y-0 sm:mr-4">
              <p className="font-medium text-sm sm:text-base">
                {pro.product.title}
              </p>
              <p className="text-xs text-gray-500">ID: {pro.product._id}</p>
            </div>
            <div className="flex flex-col items-start sm:items-end text-right">
              <p className="font-medium text-sm sm:text-base">
                Rs. {pro.product.price}
              </p>
              <p className="text-xs text-gray-500">Qty: {pro.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Receiver Details Section */}
      <div className="mt-4 border-t border-gray-300 pt-4">
        <h3 className="text-md font-semibold">Receiver Details:</h3>
        <p className="capitalize text-sm">Name: {order.receiverName}</p>
        <p className="text-sm">Email: {order.email}</p>
        <p className="text-sm">Address: {order.address}</p>
      </div>
    </div>
  );
};

export default Ordercomponent;
