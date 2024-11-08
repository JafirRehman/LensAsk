import Banner from "../Components/Home/Banner";
import "../styles/Home.scss";
import { useEffect, useState } from "react";
import Spinner from "../Components/Constants/Spinner";
import ProductsSlide from "../Components/Home/ProductsSlide";
import { toast } from "react-hot-toast";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
        console.error(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="">
      <Banner />
      {isLoading ? (
        <Spinner />
      ) : products.length > 0 ? (
        <ProductsSlide productsState={products} />
      ) : (
        <div className="w-screen h-screen flex justify-center items-center">
          <p className="font-bold">There Are No Products!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
