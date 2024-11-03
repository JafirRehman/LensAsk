import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import { updateuser } from "../../redux/Slices/UserSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const CreateOrderpage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProductData() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BACKEND_BASE_URL}/AuthCommon/userdetails`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        dispatch(updateuser(data.existeduser));
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchProductData();
  }, [dispatch]);

  const [formdata, setFormdata] = useState({
    receiverName: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  function changeformvalues(e) {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }

  async function createOrder(formdata) {
    setIsLoading(true);
    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_BASE_URL}/customer/createorder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formdata),
        }
      );
      const data = await response.json();
      dispatch(updateuser(data.existeduser));
      toast.success(data.message);
      navigate("/user/profile");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  function formhandler(e) {
    e.preventDefault();
    createOrder(formdata);
  }

  return (
    <>
      <div className="h-screen w-[90%]  max-w-[1250px] mx-auto flex justify-center">
        <div className="bg-[#F1F2F3] self-start py-3 mt-3 px-20">
          <form
            onSubmit={formhandler}
            className=" flex flex-col text-[1.2rem] mobile:w-96 self-start mobile:text-[1.2rem]"
          >
            <label htmlFor="receiverName" className="mt-2 mb-2">
              Name<span className="text-ourred-500">*</span>
            </label>
            <input
              onChange={changeformvalues}
              name="receiverName"
              value={formdata.receiverName}
              required
              id="receiverName"
              className="text-[1rem] h-[50px] p-5 focus:outline-none text-white"
              type="text"
              placeholder="Enter Receiver Name"
            ></input>
            <label htmlFor="email" className="mt-2 mb-2">
              Email<span className="text-ourred-500">*</span>
            </label>
            <input
              onChange={changeformvalues}
              name="email"
              value={formdata.email}
              required
              id="email"
              className="  text-[1rem] h-[50px] p-5 focus:outline-none text-white "
              type="email"
              placeholder="Enter Email Address"
            ></input>
            <label htmlFor="address" className="mt-2 mb-2">
              Address<span className="text-ourred-500">*</span>
            </label>
            <input
              onChange={changeformvalues}
              name="address"
              value={formdata.address}
              required
              id="address"
              className=" text-[1rem] h-[50px] p-5 focus:outline-none text-white "
              type="text"
              placeholder="Enter Address"
            ></input>
            <label htmlFor="phoneNumber" className="mt-2 mb-2">
              Phone Number<span className="text-ourred-500">*</span>
            </label>
            <input
              onChange={changeformvalues}
              name="phoneNumber"
              value={formdata.phoneNumber}
              required
              id="phoneNumber"
              className=" text-[1rem] h-[50px] p-5 focus:outline-none text-white"
              type="text"
              placeholder="ex - 03000000000"
            ></input>
            <button
              type="submit"
              className=" flex items-center justify-center text-ourred-50 mt-10 bg-[#0E0E11] text-[1.2rem] sm:text-[1.5rem] pt-5 pb-5 max-h-9 min-h-9 hover:scale-[0.93] transition-transform duration-300"
            >
              {isLoading ? <Spinner /> : "Create Order"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateOrderpage;
