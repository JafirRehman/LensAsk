import { useNavigate } from "react-router-dom";
import "../../styles/Banner.scss";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-banner py-[80px] h-screen">
      <div className="content">
        <div className="text-content">
          <h1>Style meets vision.</h1>
          <p>
            Premium Clear And Aun Arescription Lenses, From Regular And Thin
            Persol Signature Lenses To Our Top Line Of Premium Glass Lenses.
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
