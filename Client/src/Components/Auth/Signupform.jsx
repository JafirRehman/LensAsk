import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Spinner from "../Constants/Spinner";

const Signupform = () => {
  const [isloading, setIsloading] = useState(false);
  const [passwordtype, setPasswordtype] = useState("password");
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function changepasswordtype() {
    passwordtype === "password"
      ? setPasswordtype("text")
      : setPasswordtype("password");
  }
  function changeformvalues(e) {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }
  async function createuser(newuserobj) {
    setIsloading(true);
    if (!navigator.onLine) {
      toast.error("Oops, You are Offline!");
      setIsloading(false);
      return;
    }
    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newuserobj),
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsloading(false);
    }
  }
  async function formhandler(e) {
    e.preventDefault();
    await createuser(formdata);
  }
  return (
    <div className="mt-10 mobile:mt-14">
      <h1 className="font-bold text-[36px]">Create an Account</h1>
      <h2>Enter your details below</h2>
      <form
        onSubmit={formhandler}
        className="flex flex-col text-[1.2rem] mt-6 mobile:text-[1.2rem]"
      >
        <input
          onChange={changeformvalues}
          name="name"
          value={formdata.name}
          required
          id="name"
          className=" mb-7 text-[1rem] h-[50px] p-2 focus:outline-none  mobile:w-[400px] border-b-2 w-full"
          type="text"
          placeholder="Name"
        ></input>

        <input
          onChange={changeformvalues}
          name="email"
          value={formdata.email}
          required
          id="email"
          className="mb-7 text-[1rem] h-[50px] p-2 focus:outline-none mobile:w-[400px] border-b-2 w-full"
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
            className="h-[50px] focus:outline-none p-2 text-[1rem] w-full mobile:w-[400px] border-b-2"
            type={passwordtype}
            placeholder="Password"
          ></input>
        </div>
        <button
          type="submit"
          className=" flex items-center justify-center text-ourred-50 mt-10 bg-ourred-700 rounded text-[1.2rem] sm:text-[1.5rem] pt-5 pb-5 max-h-9 min-h-9 hover:scale-[0.93] transition-transform duration-300"
        >
          {isloading ? <Spinner /> : "SignUp"}
        </button>
      </form>
    </div>
  );
};
export default Signupform;
