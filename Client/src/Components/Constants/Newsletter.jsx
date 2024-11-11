import { useState } from "react";
import "../../styles/Newsletter.scss";
import Spinner from "./Spinner.jsx";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isloading, setIsloading] = useState(false);

  async function subscribe(email) {
    setIsloading(true);
    if (!navigator.onLine) {
      toast.error("Oops, You are Offline!");
      setIsloading(false);
      return;
    }
    try {
      const result = await fetch(
        `${import.meta.env.VITE_API_BACKEND_BASE_URL}/common/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );
      const data = await result.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsloading(false);
      setEmail("");
    }
  }

  function formhandler(e) {
    e.preventDefault();
    subscribe(email);
  }

  return (
    <div className="newsletter-section">
      <div className="newsletter-content">
        <span className="small-text">Newsletter</span>
        <span className="big-text">SignUp For Latest Updates</span>
        <form className="form" onSubmit={formhandler}>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
          />
          <button type="submit">
            {isloading ? <Spinner status={true} /> : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
