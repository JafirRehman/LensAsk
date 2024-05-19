import React from 'react'
import CusOrderspage from '../../Pages/Customer/CusOrderspage'

const Intro = ({ userState }) => {
    return (
        <>
            <div className=" bg-white dark:bg-zinc-800 p-4 rounded-lg">
                <img src={userState.user.image} alt="Profile Image" className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h1 className="text-xl font-bold uppercase text-center">{userState.user.name}</h1>
                <h2 className="text-sm text-center text-zinc-500">{userState.user.email}</h2>
                {
                    userState.user.role === 'Customer' && (
                        <h3 className="text-3xl text-center mt-20 underline font-bold">My Orders</h3>
                    )
                }
            </div>

            {userState.user.role === 'Customer' && <CusOrderspage />}
        </>
    )
}

export default Intro