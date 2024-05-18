import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { useDispatch } from 'react-redux';
import { addtocartThunk } from '../redux/Slices/UserSlice';
import { removefromcartThunk } from '../redux/Slices/UserSlice';
import toast from 'react-hot-toast';
const ProductDetails = () => {
  const { productid } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const usercart = userState.user.cart;

  const products = useSelector(state => state.products.products)
  const product = products.find(product => product._id === productid)

  const addToCart = (productId) => {
    if (userState?.user) {
      dispatch(addtocartThunk(productId));
    } else {
      toast.error("Please login to add items to cart");
      navigate("/login");
    }
  }
  const removefromCart = (productId) => {
    if (userState.user) {
      dispatch(removefromcartThunk(productId));
    } else {
      toast.error("Please login to remove items from cart");
      navigate("/login");
    }
  }

  return (
    <div className="mx-auto p-4 h-screen max-w-[70%]">
      {
        product && (
          <div className="flex flex-col md:flex-row h-[70%] mt-10 w-full">
            <div className="flex w-[50%] justify-center items-center bg-[#F2F2F2]">
              <img src={product.image} alt="product" className="" />
            </div>
            <div className="w-[50%] flex flex-col justify-between ml-0 md:ml-8 mt-4 md:mt-0">
              <h2 className="text-xl font-bold">{product.title}</h2>
              <p className="text-lg text-[15px] mt-2">{product.description}</p>
              <p className="mt-4 text-zinc-600 capitalize">{`Brand : ${product.category}`}</p>
              <p className="mt-4 text-zinc-600">{`Rs . ${product.price}`}</p>
              <div className="mt-4">
                {
                  usercart?.length > 0 && usercart?.some((pro) => pro._id === product._id) ?
                    (<button
                      className="bg-[#0E0E11] text-ourred-50 hover:scale-90 transition-all duration-200 h-10 w-40 rounded-lg mt-4"
                      onClick={() => { removefromCart(product._id) }}>
                      {userState && userState.isLoading ? <Spinner status={true} /> : "Remove Item"}
                    </button>) :
                    (<button
                      className="bg-[#0E0E11] text-ourred-50 hover:scale-90 transition-all duration-200 h-10 w-40 rounded-lg mt-4"
                      onClick={() => { addToCart(product._id) }}>
                      {userState && userState.isLoading ? <Spinner status={true} /> : "Add to Cart"}
                    </button>)
                }
              </div>
            </div>
          </div>
        )
      }
      {!product && <Spinner />}
    </div>
  )
}

export default ProductDetails

/**<div className="flex gap-2 items-center">
              <button className="bg-zinc-200 text-black px-2 py-1 rounded">-</button>
              <span>1</span>
              <button className="bg-zinc-200 text-black px-2 py-1 rounded">+</button>
            </div> */
