import React, { useEffect } from 'react'
import { useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { loginThunk } from '../../redux/Slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Spinner from '../Spinner';

const Loginform = () => {

    const [passwordtype, setPasswordtype] = useState('password')
    const [formdata, setFormdata] = useState({
        email: '',
        password: ''
    })

    let userState = useSelector(state => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (userState.success === true) {
            navigate('/user/profile');
        }
    }, [userState]);

    function formhandler(e) {
        e.preventDefault();
        dispatch(loginThunk(formdata));
    }

    function changepasswordtype() {
        passwordtype === "password" ? setPasswordtype("text") : setPasswordtype("password")
    }
    function changeformvalues(e) {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }

    return (
        <div className='bg-[#F1F2F3] p-14 self-start mt-12'>
            <form onSubmit={formhandler} className='flex flex-col text-[1.2rem] mobile:text-[1.2rem]'>
                <label htmlFor='email' className='mt-2 mb-2'>Email Address<span className='text-ourred-500'>*</span></label>
                <input onChange={changeformvalues} name='email' value={formdata.email} required id='email' className='text-[1rem] h-[50px] p-5 focus:outline-none text-white' type='email' placeholder='Enter Email Address'></input>
                <label htmlFor='password' className='mt-10 mb-2'>Password<span className='text-ourred-500'>*</span></label>
                <div className='relative'>
                    <button type='button' onClick={changepasswordtype}>{passwordtype === "password" ? <IoMdEye className='text-[#0E0E11] absolute top-4 right-2 text-[1.5rem] ' /> : <IoMdEyeOff className='text-[#0E0E11] absolute top-4 right-2 text-[1.5rem] ' />}</button>
                    <input onChange={changeformvalues} name='password' value={formdata.password} id='password' required maxLength={15} className=' h-[50px] p-5 focus:outline-none text-[1rem] w-72 focus:border-[#0E0E11]' type={passwordtype} placeholder='Enter Password'></input>
                </div>
                <button type='submit' className=' flex items-center justify-center text-ourred-50 mt-10 bg-[#0E0E11] text-[1.2rem] sm:text-[1.5rem] pt-5 pb-5 max-h-9 min-h-9 hover:scale-[0.93] transition-transform duration-300'>
                    {userState?.isLoading ? <Spinner /> : "Login"}
                </button>
            </form>
        </div>
    )
}

export default Loginform