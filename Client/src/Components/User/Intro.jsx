/* eslint-disable react/prop-types */
import CusOrderspage from "../../Pages/Customer/CusOrdersList";

const Intro = ({ userState }) => {
  return (
    <>
      <div className=" p-4 rounded-lg">
        <img
          src={userState.user.image}
          alt="Profile Image"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-xl font-bold uppercase text-center">
          {userState.user.name}
        </h1>
        <h2 className="text-sm text-center text-zinc-500">
          {userState.user.email}
        </h2>
      </div>

      {userState.user.role === "Customer" && <CusOrderspage />}
    </>
  );
};

export default Intro;
