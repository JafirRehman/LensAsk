import { useEffect } from "react";
import Spinner from "../../Components/Constants/Spinner";
import Product from "../../Components/Home/Product";
import { useState } from "react";
import toast from "react-hot-toast";
const Products = () => {
  const [brand, setBrand] = useState("all");
  const [price, setPrice] = useState(null);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    if (!navigator.onLine) {
      toast.error("Oops, You are Offline!");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_BASE_URL}/common/getallproducts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      setProducts(data.data);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // brand filter
  let producttoshow;
  if (brand === "all") {
    producttoshow = products;
  } else {
    producttoshow = products.filter((product) => product.category === brand);
  }
  // price filter
  let pricefilterproducts;
  if (price) {
    pricefilterproducts = producttoshow.filter(
      (eachproduct) => eachproduct.price <= price
    );
  } else {
    pricefilterproducts = producttoshow;
  }
  // search filter
  let searchfilterproducts = pricefilterproducts.filter((eachproduct) =>
    eachproduct.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto pt-10">
      {isLoading ? (
        <Spinner />
      ) : products.length > 0 ? (
        <div className="flex flex-col">
          <div className="flex flex-col items-center sm:items-baseline justify-center gap-10 sm:gap-0 sm:flex-row mobile:justify-between w-[80%] sm:w-[95%] mx-auto">
            <select
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              id="brandfilter"
              name="brandfilter"
              className="select select-bordered bg-none w-full bg-transparent rounded border p-2 border-solid border-neutral-300 sm:max-w-[20%]"
            >
              <option value="all">All Category</option>
              <option value="gucci">Gucci</option>
              <option value="rayban">RayBan</option>
              <option value="dior">Dior</option>
              <option value="celine">Celine</option>
            </select>
            <div className=" w-full sm:max-w-[20%]">
              <div className="relative flex w-full items-stretch">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  id="searchfilter"
                  name="searchfilter"
                  type="search"
                  className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                />

                {/* <!--Search icon--> */}
                <span
                  className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal"
                  id="basic-addon2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <select
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              id="pricefilter"
              name="pricefilter"
              className="select select-bordered bg-none w-full bg-transparent sm:max-w-[20%] border-neutral-300 rounded border p-2 border-solid"
            >
              <option value={null}>All Price Ranges</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
            </select>
          </div>
          <div className="flex justify-center flex-col mobile:flex-row mobile:flex-wrap gap-5 items-center max-w-6xl p-6 mx-auto my-7 min-h-[80vh]">
            {searchfilterproducts.length > 0 ? (
              searchfilterproducts.map((product) => (
                <Product key={product._id} post={product} />
              ))
            ) : (
              <div className="h-screen flex justify-center pt-40">
                <p className="font-bold">No Products to Show</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <p className="font-bold">No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default Products;
