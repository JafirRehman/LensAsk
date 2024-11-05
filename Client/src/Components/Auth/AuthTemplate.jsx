/* eslint-disable react/prop-types */
import Loginform from "./Loginform";
import Signupform from "./Signupform";

const AuthTemplate = ({ formtype }) => {
  return (
    <div className="h-screen w-[90%] max-w-[1250px] mx-auto flex justify-center">
      {formtype === "Login" ? <Loginform /> : <Signupform />}
    </div>
  );
};

export default AuthTemplate;
