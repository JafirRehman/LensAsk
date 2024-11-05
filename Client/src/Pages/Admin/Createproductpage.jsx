import { useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../../Components/Constants/Spinner";

const Createproductpage = () => {
  const [formdata, setFormdata] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [isloading, setIsloading] = useState(false);

  function changeformvalues(e) {
    if (e.target.type === "file") {
      setFormdata({ ...formdata, image: e.target.files[0] });
    } else {
      setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }
  }

  async function createproduct(formdata) {
    setIsloading(true);
    try {
      const formData = new FormData();
      Object.keys(formdata).forEach((key) => {
        formData.append(key, formdata[key]);
      });

      let response = await fetch("http://localhost:5000/admin/createproduct", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
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
    <div className="h-screen w-full max-w-[1250px] mx-auto flex justify-center">
      <div className="bg-[#F1F2F3] self-start py-3 mt-3 px-4 w-full sm:w-[90%] lg:w-[40vw] mx-auto">
        <form
          encType="multipart/form-data"
          onSubmit={formhandler}
          className=" flex mx-auto flex-col text-[1.2rem] w-full sm:w-96 mobile:text-[1.2rem]"
        >
          <label htmlFor="title">
            Title<span className="text-ourred-500">*</span>
          </label>
          <input
            onChange={changeformvalues}
            name="title"
            value={formdata.title}
            required
            id="title"
            className="mb-5 text-[1rem] h-[50px] p-5 focus:outline-none text-white"
            type="text"
            placeholder="Enter Product Title"
          ></input>

          <label htmlFor="price">
            Price<span className="text-ourred-500">*</span>
          </label>
          <input
            onChange={changeformvalues}
            name="price"
            value={formdata.price}
            required
            id="price"
            className=" text-[1rem] h-[50px] p-5 focus:outline-none text-white"
            type="text"
            placeholder="Enter Price"
          ></input>

          <label htmlFor="description" className="mt-2 mb-2">
            Description<span className="text-ourred-500">*</span>
          </label>
          <input
            onChange={changeformvalues}
            name="description"
            value={formdata.description}
            required
            id="description"
            className=" text-[1rem] h-[50px] p-5 focus:outline-none text-white"
            type="text"
            placeholder="Enter Description"
          ></input>

          <div className="flex justify-between">
            <div className="w-[45%] flex flex-col">
              <label htmlFor="category" className="mt-2 mb-2">
                Category<span className="text-ourred-500">*</span>
              </label>
              <select
                onChange={changeformvalues}
                name="category"
                value={formdata.category}
                required
                id="category"
                className=" text-[1rem] h-[50px] p-3 focus:outline-none text-white"
              >
                <option value="">Select category</option>
                <option value="gucci">Gucci</option>
                <option value="rayban">RayBan</option>
                <option value="dior">Dior</option>
                <option value="celine">Celine</option>
              </select>
            </div>
            <div className="w-[45%] flex flex-col">
              <label htmlFor="image" className="mt-2 mb-2">
                Image<span className="text-ourred-500">*</span>
              </label>
              <input
                onChange={changeformvalues}
                name="image"
                required
                id="image"
                className=" text-[1rem] h-[50px] p-3 focus:outline-none text-white"
                type="file"
              ></input>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center text-ourred-50 mt-10 bg-[#0E0E11] text-[1.2rem] font-bold sm:text-[1.5rem] pt-5 pb-5 max-h-9 min-h-9 rounded-xl hover:scale-[0.93] transition-transform duration-300"
          >
            {isloading ? <Spinner /> : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createproductpage;
