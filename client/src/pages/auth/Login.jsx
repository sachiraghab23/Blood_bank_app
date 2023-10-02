import React from "react";
import loginImage from "./../../assets/images/bannerImage5.png";
import SharedForm from "../../components/shared/Form/SharedForm";

const Login = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-8 form-banner">
          <img src={loginImage} alt="loginImage" />
        </div>
        <div className="col-md-4 form-container">
          <SharedForm
            formTitle={"Login Page"}
            submitBtn={"Login"}
            formType={"login"}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
