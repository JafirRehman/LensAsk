import React from 'react'

const Ordercomponent = ({ order }) => {
    return (
        <div className="flex flex-col items-center justify-center bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white p-4 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold mt-4">{order.receiverName}</h2>
            <p className="text-lg mt-2">Phone Number: {order.phoneNumber}</p>
            <p className="text-lg mt-2">Email: {order.email}</p>
            <p className="text-lg mt-2">Order Number: {order._id}</p>
            <p className="text-lg mt-2">Address: {order.address}</p>
            <p className="text-lg mt-2">Total Price: {order.totalPrice}</p>
            {order.products.map((product) => (
                <div key={product._id} className="flex justify-center mt-4 space-x-4">
                    <img src={product.image} alt="Product Image" className="w-24 h-24 object-cover rounded-lg mb-2" style={{ objectFit: 'cover' }} />
                    <div className="flex flex-col items-start ml-4 space-y-2">
                        <p className="text-lg">Product Name: {product.title}</p>
                        <p className="text-lg">product ID: {product._id}</p>
                        <p className="text-lg">Price: {product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Ordercomponent