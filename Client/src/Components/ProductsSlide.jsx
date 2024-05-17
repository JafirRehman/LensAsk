import React from 'react'
import { differenceInHours, parseISO } from 'date-fns';
const ProductsSlide = ({productsState}) => {
    return (
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
            <div className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                {
                    productsState.products.map((post) => (
                        <div key={post._id} className="flex flex-row gap-y-32">
                            <div className="h-[250px] justify-center items-center w-[300px] relative bg-[#e6e6fc5b] flex">
                                <img src={post.image} className=" max-w-[150px] max-h-[150px] mix-blend-multiply h-full w-[150px]" alt="" />
                                {
                                    differenceInHours(new Date(), parseISO(post.createdAt)) <= 24 &&
                                    <div className="absolute rounded-full top-5 right-2 bg-[#60d400] text-ourred-50 animate-bounce text-white px-2 py-1 z-10 text-xs font-bold uppercase">New</div>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
                {
                    productsState.products.map((post) => (
                        <div key={post._id} className="flex flex-row gap-y-32">
                            <div className="h-[250px] justify-center items-center w-[300px] relative bg-[#e6e6fc5b] flex">
                                <img src={post.image} className=" max-w-[150px] max-h-[150px] mix-blend-multiply h-full w-[150px]" alt="" />
                                {
                                    differenceInHours(new Date(), parseISO(post.createdAt)) <= 24 &&
                                    <div className="absolute rounded-full top-5 right-2 bg-[#60d400] text-ourred-50 animate-bounce text-white px-2 py-1 z-10 text-xs font-bold uppercase">New</div>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductsSlide