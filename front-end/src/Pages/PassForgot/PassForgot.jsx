import "./PassForgot.css";
import { useDispatch } from "react-redux";
import { sendResetLink } from "../../redux/reducers/Pass";
import image from "../../assets/Svg/undraw_forgot_password_re_hxwm.svg";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


const PassForgot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetPassword = (event) => {
    event.preventDefault();
    const email = event.target.user_login.value;
    dispatch(sendResetLink(email))
      .then(() => {
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Reset link sent!',
          text: 'Please check your email to reset your password.'
        });
        navigate("/");

      })
      .catch(() => {
        // Show error alert
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User not found try again'
        });
      });
  };

  return (
    <div className="pass-forgot-container">
      <div className="pass-forgot-image-container">
        <img src={image} alt="Image" />
      </div>
      <div className="pass-forgot-form-container">
        <h2>Mot de passe oublié </h2>
        <form onSubmit={handleResetPassword}>
          <label htmlFor="user_login">Saisissez votre email :</label>
          <input type="email" id="user_login" name="user_login" required />
          <button type="submit"> Réinitialiser le mot de passe.</button>
        </form>
      </div>
    </div>
  );
};

export default PassForgot;
