// Done
import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../Components/Constants/Spinner";
import { useNavigate } from "react-router-dom";

const Createproductpage = () => {
  const [formdata, setFormdata] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

  function changeformvalues(e) {
    if (e.target.type === "file") {
      setFormdata({ ...formdata, image: e.target.files[0] });
    } else {
      setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }
  }

  async function createproduct(formdata) {
    setIsloading(true);
    if (!navigator.onLine) {
      toast.error("Oops, You are Offline!");
      setIsloading(false);
      return;
    }
    try {
      const formData = new FormData();
      Object.keys(formdata).forEach((key) => {
        formData.append(key, formdata[key]);
      });

      let response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_BASE_URL}/admin/createproduct`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      toast.success("Product added successfully!");
      navigate("/products");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsloading(false);
    }
  }
  function formhandler(e) {
    e.preventDefault();
    createproduct(formdata);
  }

  return (
    <div className="h-screen w-full pt-10 sm:px-5 px-5 max-w-[1250px] mx-auto flex justify-center">
      <div className="self-start py-3 w-full mx-auto ">
        <form
          encType="multipart/form-data"
          onSubmit={formhandler}
          className="flex mx-auto flex-col text-[1.2rem] w-full sm:w-96 mobile:text-[1.2rem] mobile:w-[400px]"
        >
          <input
            onChange={changeformvalues}
            name="title"
            value={formdata.title}
            required
            id="title"
            className="mb-5 text-[1rem] h-[50px] mt-5 focus:outline-none border-b p-2"
            type="text"
            placeholder="Title"
          ></input>
          <input
            onChange={changeformvalues}
            name="price"
            value={formdata.price}
            required
            id="price"
            className=" text-[1rem] h-[50px] focus:outline-none border-b p-2"
            type="number"
            placeholder="Price"
          ></input>

          <input
            onChange={changeformvalues}
            name="description"
            value={formdata.description}
            required
            id="description"
            className=" text-[1rem] h-[50px] mt-5 p-2 focus:outline-none border-b"
            type="text"
            placeholder="Description"
          ></input>

          <div className="flex justify-between">
            <div className="w-[45%] flex flex-col">
              <select
                onChange={changeformvalues}
                name="category"
                value={formdata.category}
                required
                id="category"
                className=" text-[1rem] text-gray-400 mt-5 h-[50px] bg-transparent p-2 border-b focus:outline-none"
              >
                <option value="">Category</option>
                <option value="gucci">Gucci</option>
                <option value="rayban">RayBan</option>
                <option value="dior">Dior</option>
                <option value="celine">Celine</option>
              </select>
            </div>
            <div className="w-[45%] flex flex-col">
              <input
                onChange={changeformvalues}
                name="image"
                required
                id="image"
                className="mt-9 text-[1rem] bg-transparent h-[50px] focus:outline-none"
                type="file"
              ></input>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center text-ourred-50 mt-10 bg-ourred-700 text-[1.2rem] font-bold sm:text-[1.5rem] pt-5 pb-5 max-h-9 min-h-9 rounded hover:scale-[0.93] transition-transform duration-300"
          >
            {isloading ? <Spinner /> : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createproductpage;
