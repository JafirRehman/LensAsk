import React from 'react'

import Loginform from './Loginform'
import Signupform from './Signupform'

const AuthTemplate = ({ title, formtype }) => {
    return (
        <div className='mb-[100px] mt-5 w-[90%] max-w-[1250px] mx-auto'>

            <div className='w-full items-center flex flex-col mx-auto md:w-[100%] '>
                <div className='w-full flex gap-2 self-center'>
                    <h1 className='text-[2.5rem] mobile:text-[3.5rem] font-bold'>
                        <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text'>
                            {title}
                        </span>
                    </h1>
                </div>
                {formtype === 'Login' ? <Loginform /> : <Signupform />}
            </div>

        </div>

    )
}

export default AuthTemplate