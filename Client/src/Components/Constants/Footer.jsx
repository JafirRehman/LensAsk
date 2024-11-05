import "../../styles/Footer.scss";
import { FaMobileAlt, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="col">
          <div className="title">About</div>
          <div className="text">
            At OurLens, we are dedicated to providing you with the highest
            quality lenses. Our passion for vision drives us to deliver
            top-notch products that cater to a variety of needs. Whether
            you&apos;re looking for daily wear lenses, colored lenses, or
            specialty lenses, we&apos;ve got you covered. Our commitment to eye
            care goes beyond providing lenses - we strive to educate our
            customers and promote eye health. Experience the OurLens difference
            today.
          </div>
        </div>
        <div className="col">
          <div className="title">Contact</div>
          <div className="c-item">
            <FaMobileAlt />
            <div className="text">Phone: 0308-9079661</div>
          </div>
          <div className="c-item">
            <FaEnvelope />
            <div className="text">Email: rjafirmalana@gmail.com</div>
          </div>
        </div>
        <div className="col">
          <div className="title">Categories</div>
          <span className="text">Gucci</span>
          <span className="text">RayBan</span>
          <span className="text">Dior</span>
          <span className="text">Celine</span>
        </div>
        <div className="col">
          <div className="title">Pages</div>
          <span onClick={() => navigate("/")} className="text">
            Home
          </span>
          <span onClick={() => navigate("/products")} className="text">
            Products
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
