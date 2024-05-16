import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';

const Signupform = () => {
    const [isloading, setIsloading] = useState(false)
    const [passwordtype, setPasswordtype] = useState('password')
    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    function changepasswordtype() {
        passwordtype === "password" ? setPasswordtype("text") : setPasswordtype("password")
    }
    function changeformvalues(e) {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    async function createuser(newuserobj) {
        setIsloading(true)
        try {
            let response = await fetch('http://localhost:5000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(newuserobj)
            })
            return await response.json()

        } catch (error) {
            return { success: false, message: 'something went wrong' }
        } finally {
            setIsloading(false)
        }

    }
    async function formhandler(e) {
        e.preventDefault()
        let result = await createuser(formdata)
        if (result.success) {
            toast.success(result.message)
            navigate('/login')
        } else {
            toast.error(result.message)
        }
    }
    return (
        <div>
            <form onSubmit={formhandler} className='flex flex-col text-[1.2rem] mobile:text-[1.2rem]'>
                <label htmlFor='name' className='mt-2 mb-2'>Name<span className='text-ourred-500'>*</span></label>
                <input onChange={changeformvalues} name='name' value={formdata.name} required id='name' className=' border mb-5 border-ourred-500 text-[1rem] rounded-xl h-[50px] p-5 focus:outline-none text-white focus:border-ourred-900' type='text' placeholder='Enter name'></input>
                <label htmlFor='email' className='mt-2 mb-2'>Email Address<span className='text-ourred-500'>*</span></label>
                <input onChange={changeformvalues} name='email' value={formdata.email} required id='email' className=' border border-ourred-500 text-[1rem] rounded-xl h-[50px] p-5 focus:outline-none text-white focus:border-ourred-900' type='email' placeholder='Enter Email Address'></input>
                <label htmlFor='password' className='mt-5 mb-2'>Password<span className='text-ourred-500'>*</span></label>
                <div className='relative'>
                    <button type='button' onClick={changepasswordtype}>{passwordtype === "password" ? <IoMdEye className='text-ourred-500 absolute top-4 right-2 text-[1.5rem] ' /> : <IoMdEyeOff className='text-ourred-500 absolute top-4 right-2 text-[1.5rem] ' />}</button>
                    <input onChange={changeformvalues} name='password' value={formdata.password} id='password' required maxLength={15} className=' border border-ourred-500 rounded-xl h-[50px] p-5 focus:outline-none text-[1rem] w-72 focus:border-ourred-900' type={passwordtype} placeholder='Enter Password'></input>
                </div>
                <button type='submit' className=' flex items-center justify-center text-ourred-50 mt-10 bg-ourred-600 hover:bg-ourred-800 text-[1.2rem] font-bold sm:text-[1.5rem] pt-5 pb-5 max-h-9 min-h-9 rounded-xl hover:scale-[0.93] transition-transform duration-300'>
                    {isloading ? (
                        <Spinner/>
                    ) : (
                        'Signup'
                    )}
                </button>
            </form>
        </div>
    )
}
export default Signupform