/* eslint-disable react/prop-types */

import { differenceInHours, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

const ProductsSlide = ({ productsState }) => {
  const navigate = useNavigate();
  return (
    <div className=" pb-16">
      <div className="pt-20 pb-12 w-full inline-flex flex-nowrap overflow-hidden">
        <div className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
          {productsState.map((post) => (
            <div key={post._id} className="bg-[#F2F2F2] flex gap-3 flex-row">
              <div className="h-[300px] justify-center items-center  w-[300px] relative  flex">
                <img
                  src={post.image}
                  className=" h-[140px] w-[140px] mix-blend-multiply"
                  alt=""
                />
                {differenceInHours(new Date(), parseISO(post.createdAt)) <=
                  24 && (
                  <div className="absolute rounded-full top-5 right-2 bg-[#60d400] animate-bounce text-white px-2 py-1 z-10 text-xs font-bold uppercase">
                    New
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div
          className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
          aria-hidden="true"
        >
          {productsState.map((post) => (
            <div key={post._id} className="bg-[#F2F2F2] flex gap-3 flex-row">
              <div className="h-[300px] justify-center items-center w-[300px] relative flex">
                <img
                  src={post.image}
                  className=" h-[140px] w-[140px] mix-blend-multiply"
                  alt=""
                />
                {differenceInHours(new Date(), parseISO(post.createdAt)) <=
                  24 && (
                  <div className="absolute rounded-full top-5 right-2 bg-[#60d400] animate-bounce text-white px-2 py-1 z-10 text-xs font-bold uppercase">
                    New
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex text-ourred-50 ">
        <button
          className="bg-[#0E0E11] hover:scale-75 transition-all duration-300 mx-auto px-8 py-2 rounded-full"
          onClick={() => {
            navigate("/products");
          }}
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default ProductsSlide;
