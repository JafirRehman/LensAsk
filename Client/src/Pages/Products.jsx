import { useEffect } from "react";
import Spinner from "../Components/Spinner";
import Product from "../Components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/Slices/ProductsSlice";

const Products = () => {
    const dispatch = useDispatch();
    const productsState = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    return (
        <div>
            {productsState.isLoading && <Spinner />}

            {!productsState.isLoading && productsState.products.length > 0 && (


                <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-8 max-w-6xl p-6 mx-auto my-7 min-h-[80vh]">
                    {
                        productsState.products.map((post) => (
                            <Product key={post._id} post={post} />
                        ))
                    }
                </div>

            )}
            {!productsState.isLoading && productsState.products.length === 0 && productsState.error && (
                <div className="w-screen h-screen flex justify-center items-center">
                    <p className="font-bold">No Data Found</p>
                </div>
            )}

        </div>
    );
};

export default Products;