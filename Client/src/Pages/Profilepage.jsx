import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import Intro from '../Components/Profile/Intro'
import Spinner from '../Components/Spinner';
import toast from 'react-hot-toast';
import { updateuser } from "../redux/Slices/UserSlice"

const Profilepage = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    
    async function fetchProductData() {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/AuthCommon/userdetails", {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.ok) {
                const data = await res.json();
                dispatch(updateuser(data.existeduser))
            } else {
                const data = await res.json();
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error("something went wrong");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    const userState = useSelector(state => state.user)
    
    return (
        <div className='w-full mt-10'>
            {
                !loading && userState && (
                    <Intro userState={userState} />
                )
            }
            {
                loading && (
                    <Spinner />
                )
            }
        </div>
    )
}

export default Profilepage