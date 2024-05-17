import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../Components/Spinner';

const ProductDetails = () => {
  const { productid } = useParams();
  const products = useSelector(state => state.products.products)
  const product = products.find(product => product._id === productid)
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
                <button className="bg-[#0E0E11] text-ourred-50 hover:scale-90 transition-all duration-200 px-4 py-2 rounded-lg mt-4">ADD TO CART</button>
              </div>
            </div>
          </div>
        )
      }
      {!product && <Spinner/>}
    </div>
  )
}

export default ProductDetails

/**<div className="flex gap-2 items-center">
              <button className="bg-zinc-200 text-black px-2 py-1 rounded">-</button>
              <span>1</span>
              <button className="bg-zinc-200 text-black px-2 py-1 rounded">+</button>
            </div> */

/**<div className="flex flex-col md:flex-row h-[70%] mt-10 w-full">
<div className="flex w-[50%] justify-center items-center bg-[#F2F2F2]">
<img src="https://res.cloudinary.com/dxrnq0wcs/image/upload/v1715772539/Products/vqb5p8o9s6ayzjd43fvo.png" alt="product" className=""/>
</div>
<div className="w-[50%] flex flex-col justify-between ml-0 md:ml-8 mt-4 md:mt-0">
<h2 className="text-xl font-bold">hello</h2>
<p className="text-lg text-zinc-800 mt-2">hello</p>
<p className="mt-4 text-zinc-600">hello</p>
<p className="mt-4 text-zinc-600">hello</p>
<div className="mt-4">
<button className="bg-[#0E0E11] text-ourred-50 hover:scale-90 transition-all duration-200 px-4 py-2 rounded-lg mt-4">ADD TO CART</button>
</div>
</div>
</div> */