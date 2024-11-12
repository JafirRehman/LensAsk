import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateuser } from "../../redux/Slices/UserSlice";
import toast from "react-hot-toast";
import Spinner from "../../Components/Constants/Spinner";

const ProductDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const { productid } = useParams();

  useEffect(() => {
    const fetchProductById = async () => {
      setIsLoading(true);
      if (!navigator.onLine) {
        toast.error("Oops, You are Offline!");
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BACKEND_BASE_URL
          }/common/getproduct/${productid}`,
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
        setProduct(data.data);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductById();
  }, [productid]);

  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const usercart = userState.user.cart;

  const addToCart = async (productId) => {
    setIsLoading(true);
    if (!navigator.onLine) {
      toast.error("Oops, You are Offline!");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_BASE_URL}/customer/addtocart`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      dispatch(updateuser(data.existeduser));
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const removefromCart = async (productId) => {
    setIsLoading(true);
    if (!navigator.onLine) {
      toast.error("Oops, You are Offline!");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_BASE_URL}/customer/removefromcart`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        }
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      dispatch(updateuser(data.existeduser));
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-[95%] max-w-[1100px] h-screen sm:w-[90%] p-4">
      {product && (
        <div className="flex flex-col md:flex-row  h-[70%] mt-10 w-full justify-center items-center">
          <div className="flex w-[50%] max-md:w-[90%] justify-center items-center bg-[#F2F2F2] min-w-[200px] max-w-[500px] h-[400px]">
            <img src={product.image} alt="product" className="" />
          </div>
          <div className="w-[50%] flex flex-col justify-between max-md:w-[90%] ml-0 md:ml-8 mt-4 md:mt-0">
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p className="text-lg text-[15px] mt-2">{product.description}</p>
            <p className="mt-4 text-zinc-600 capitalize">{`Brand : ${product.category}`}</p>
            <p className="mt-4 text-zinc-600">
              <span className="text-[#16a34a]">Rs : </span>
              {`${product.price}`}
            </p>
            <div className="mt-4">
              {userState?.user?.role !== "Admin" && (
                <button
                  className="bg-ourred-700 text-ourred-50 hover:scale-90 transition-all duration-200 h-10 w-40 rounded-lg mt-4"
                  onClick={() => {
                    const isproduct = usercart?.some(
                      (pro) => pro?.product?._id === product?._id
                    );
                    isproduct
                      ? removefromCart(product._id)
                      : addToCart(product._id);
                  }}
                >
                  {isLoading ? (
                    <Spinner status={true} />
                  ) : usercart?.some(
                      (pro) => pro?.product?._id === product?._id
                    ) ? (
                    "Remove from Cart"
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
