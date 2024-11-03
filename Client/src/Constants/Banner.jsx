import { useNavigate } from "react-router-dom";
import "../styles/Banner.scss";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-banner">
      <div className="content">
        <div className="text-content">
          <h1>Style meets vision.</h1>
          <p>
            premium clear and sun prescription lenses, from regular and thin
            Persol Signature lenses to our top line of Premium Glass lenses.
          </p>
          <div className="ctas">
            <button
              onClick={() => navigate("/products")}
              className="banner-cta v2"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
