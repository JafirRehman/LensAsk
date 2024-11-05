import { Link } from "react-router-dom";

const Transectionfail = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-2">Oops!</h1>
      <p className="text-xl font-medium mb-4">Something Went Wrong</p>
      <p className="text-sm text-gray-100 mb-6 text-center px-8">
        <p className="text-sm text-gray-100 mb-6 text-center px-8">
          Please check your payment details or try again. If the issue persists,
          contact our support team for assistance.
        </p>
      </p>

      <Link
        to="/customer/cart"
        className=" text-white font-medium px-6 py-2 rounded bg-ourred-400 hover:bg-ourred-600 hover:scale-95 duration-300 transition-all"
      >
        Try Again!
      </Link>
    </div>
  );
};

export default Transectionfail;
