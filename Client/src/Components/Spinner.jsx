import React from 'react'

const Spinner = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin h-10 w-10 border-t-4 border-blue-500 rounded-full"></div>
        </div>
    )
}

export default Spinner