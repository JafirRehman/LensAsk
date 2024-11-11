import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Spinner from "../../Components/Constants/Spinner";
import toast from "react-hot-toast";
import { updateuser } from "../../redux/Slices/UserSlice";

const Loginform = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordtype, setPasswordtype] = useState("password");
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function formhandler(e) {
    e.preventDefault();
    setIsLoading(true);
    if (!navigator.onLine) {
      toast.error("Oops, You are Offline!");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_BASE_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      dispatch(updateuser(data.existeduser));
      toast.success(data.message);
      navigate("/products");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function changepasswordtype() {
    passwordtype === "password"
      ? setPasswordtype("text")
      : setPasswordtype("password");
  }
  function changeformvalues(e) {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }

  return (
    <div className="mt-20 mobile:mt-24">
      <h1 className="font-bold text-[36px]">Login to Exclusive</h1>
      <h2>Enter your details below</h2>
      <form
        onSubmit={formhandler}
        className="flex flex-col text-[1.2rem] mobile:text-[1.2rem]"
      >
        <input
          onChange={changeformvalues}
          name="email"
          value={formdata.email}
          required
          id="email"
          className="text-[1rem] h-[50px] p-2 focus:outline-none border-b-2 my-7 mobile:w-[400px]"
          type="email"
          placeholder="Email"
        ></input>
        <div className="relative">
          <button type="button" onClick={changepasswordtype}>
            {passwordtype === "password" ? (
              <IoMdEye className="text-[#0E0E11] absolute top-4 right-2 text-[1.5rem] " />
            ) : (
              <IoMdEyeOff className="text-[#0E0E11] absolute top-4 right-2 text-[1.5rem] " />
            )}
          </button>
          <input
            onChange={changeformvalues}
            name="password"
            value={formdata.password}
            id="password"
            required
            maxLength={15}
            className="h-[50px] p-2 focus:outline-none w-full text-[1rem] mobile:w-[400px] border-b-2"
            type={passwordtype}
            placeholder="Password"
          ></input>
        </div>
        <button
          type="submit"
          className="rounded flex items-center justify-center text-ourred-50 mt-10 bg-ourred-700 text-[1.2rem] sm:text-[1.5rem] pt-5 pb-5 max-h-9 min-h-9 hover:scale-[0.93] transition-transform duration-300"
        >
          {isLoading ? <Spinner /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Loginform;
