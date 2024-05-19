import React, { useState } from "react";
import "../styles/Newsletter.scss";
import Spinner from "../Components/Spinner.jsx"
import toast from 'react-hot-toast';

const Newsletter = () => {

    const [email, setEmail] = useState('');
    const [isloading, setIsloading] = useState(false)

    async function subscribe(email) {
        setIsloading(true)
        try {
            const result = await fetch("http://localhost:5000/common/subscribe", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({email})
            })
            if (result.ok) {
                const data = await result.json()
                toast.success(data.message)
            } else {
                const data = await result.json()
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Something Went Wrong")
        } finally {
            setIsloading(false)
            setEmail('')
        }
    }

    function formhandler(e) {
        e.preventDefault()
        subscribe(email)
    }

    return (
        <div className="newsletter-section">
            <div className="newsletter-content">
                <span className="small-text">Newsletter</span>
                <span className="big-text">
                    Sign up for latest updates and offers
                </span>
                <form className="form" onSubmit={formhandler}>
                    <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" />
                    <button type="submit">
                        {
                            isloading ? <Spinner status={true} /> : "Subscribe"
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
