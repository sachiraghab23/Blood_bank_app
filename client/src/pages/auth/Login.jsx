import React from "react";
import loginImage from "./../../assets/images/bannerImage5.png";
import SharedForm from "../../components/shared/Form/SharedForm";
import { useSelector } from 'react-redux';
import Spinner from "../../components/shared/Spinner/Spinner";

const Login = () => {
  const { loading, error } = useSelector(state => state.auth)
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (<Spinner />) : (
        <div className="row g-0">
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
      )}
    </>
  );
};

export default Login;
