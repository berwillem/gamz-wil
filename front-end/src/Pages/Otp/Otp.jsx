import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { confirmEmail } from "../../redux/reducers/Auth";
import "./Otp.css";
import logo from "../../assets/1.png";
import security from "../../assets/Svg/undraw_security_on_re_e491.svg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Otp = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const userId = JSON.parse(localStorage.getItem('user'))?._id || null;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(confirmEmail(userId, otp));
      Swal.fire({
        icon: 'success',
        title: 'email valid!',
        text: 'thanks for conferming your email'
      });
      navigate("/Account");
    } catch (error) {
      setError(error.response.data.error);
      console.log(error);
    }
  };

  return (
    <div className="otp-page">
      <div className="logo">
        <img src={logo} alt="" className="logo-gamz" />
      </div>
      <div className="otp-form">
        <form onSubmit={handleSubmit}>
          <h2>Email Confirmation</h2>
          <p>Un code de confirmation a été envoyé à votre email</p>
          <img src={security} alt="err" className="security-img" />
          <p>Enter verification code:</p>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
