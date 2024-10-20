import Banner from "../Constants/Banner";
import "../styles/Home.scss";
import { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
import ProductsSlide from "../Components/ProductsSlide";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_BASE_URL}/common/getallproducts`
      );
      if (!response.ok) {
        setError("Network Issue");
      } else {
        const data = await response.json();
        setProducts(data.data);
      }
    } catch (error) {
      setError("Server Issue");
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
      {error ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <p className="font-bold">{error}</p>
        </div>
      ) : isLoading ? (
        <Spinner />
      ) : products.length > 0 ? (
        <ProductsSlide productsState={products} />
      ) : (
        <div className="w-screen h-screen flex justify-center items-center">
          <p className="font-bold">No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default Home;
