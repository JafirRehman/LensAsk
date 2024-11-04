import Banner from "../Constants/Banner";
import "../styles/Home.scss";
import { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
import ProductsSlide from "../Components/ProductsSlide";
import { toast } from "react-hot-toast";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_BASE_URL}/common/getallproducts`
      );
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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