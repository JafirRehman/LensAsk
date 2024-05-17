import Banner from "../Constants/Banner";
import "../styles/Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Slices/ProductsSlice";
import ProductsSlide from "../Components/ProductsSlide";
import { useEffect } from "react";
import Spinner from "../Components/Spinner";

const Home = () => {
    const dispatch= useDispatch();
    const productsState = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(fetchProducts());
    },[])
    return (
        <div className="">
            <Banner />
            {productsState.isLoading && <Spinner />}
            {productsState && !productsState.isLoading && productsState.products.length > 0 && (
                <ProductsSlide productsState={productsState}/>
            )}
            {productsState && !productsState.isLoading && productsState.products.length === 0 && (
                <div className="w-screen h-screen flex justify-center items-center">
                    <p className="font-bold">No Data Found</p>
                </div>
            )}
            {productsState && !productsState.isLoading && productsState.error && (
                <div className="w-screen h-screen flex justify-center items-center">
                    <p className="font-bold">Error: Got error while getting data</p>
                </div>
            )}
        </div>
    );
};

export default Home;