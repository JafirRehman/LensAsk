import { useNavigate } from "react-router-dom";
import "../../styles/Banner.scss";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-banner py-[210px]">
      <div className="content">
        <div className="text-content">
          <h1 className="mb-[35px] sm:mb-[20px]">Style meets vision.</h1>
          <p className="mb-[35px] sm:mb-[20px]">
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
