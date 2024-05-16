import React from 'react'
import { useSelector } from 'react-redux'
import Intro from '../Components/Profile/Intro'

const Profilepage = () => {
    const userState = useSelector(state => state.user)
    return (
        <div className='w-full mt-10'>
            {
                userState && (
                    <Intro userState={userState}/>
                )
            }
        </div>
    )
}

export default Profilepage