import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-2">Thank you!</h1>
      <p className="text-xl font-medium mb-4">Payment Done Successfully</p>
      <p className="text-sm mb-6 text-center px-8">
        Thank you for your purchase! We truly appreciate your support and are
        excited for you to enjoy your new item. If you have any questions, feel
        free to reach out to us anytime!
      </p>

      <Link
        to="/user/profile"
        className=" text-white font-medium px-6 py-2 rounded bg-ourred-400 hover:bg-ourred-600 hover:scale-95 duration-300 transition-all"
      >
        Take me to my Profile
      </Link>
    </div>
  );
};

export default PaymentSuccess;
