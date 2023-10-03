import React from "react";
import registerImage from "./../../assets/images/bannerImage4.jpeg";
import SharedForm from "./../../components/shared/Form/SharedForm";
import Spinner from "../../components/shared/Spinner/Spinner";
import { useSelector } from 'react-redux';

const Register = () => {

  const { loading, error } = useSelector(state => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (<Spinner />) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src={registerImage} alt="registerImage" height="400px" />
          </div>
          <div className="col-md-4 form-container">
            <SharedForm
              formTitle={"Register Page"}
              submitBtn={"Register"}
              formType={"register"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
