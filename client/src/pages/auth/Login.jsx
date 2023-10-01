import React from "react";
import loginImage from "./../../assets/images/bannerImage.jpeg";
import InputType from "../../components/shared/Form/InputType";

const Login = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-8 form-banner">
          <img src={loginImage} alt="loginImage" />
        </div>
        <div className="col-md-4 form-container">
          <form>
            <InputType
              labelText={"Email address"}
              labelFor={"forEmail"}
              inputType={"email"}
              name={"email"}
            />
            <InputType
              labelText={"Password"}
              labelFor={"forPassword"}
              inputType={"password"}
              name={"password"}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
