import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import { register } from "../../redux/reducers/Auth";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Register() {
  //state
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
// submuit function
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, password, email }))
      .then(() => {
        navigate('/otp');
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };
  
  return (
    <div className="register-container">
      <div className="title-register">
        <p>Inscription</p>
      </div>
      <div className="sub-title-register">
        <p>Bienvenue, créez votre compte.</p>
      </div>

      {error && <div className="error-message">{error}</div>} 
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <strong>Nom d'utilisateur *</strong>
          <input
            name="Username"
            value={username}
            type="text"
            placeholder="écrirvez votre nom d'utilisateur"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <strong>Adresse e-mail *</strong>
          <input
            name="Email"
            value={email}
            type="email"
            placeholder="écrirvez votre e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <strong>Mot de passe *</strong>
          <div className="password-input">
          <input
            name="password"
            value={password}
            type={passwordVisible ? "text" : "password"}
            placeholder="écrirvez votre mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
      <FontAwesomeIcon
      icon={passwordVisible ? faEyeSlash : faEye}
      onClick={() => setPasswordVisible(!passwordVisible)}
      className="password-icon"
    />
          </div>
        </label>
        <div className="check-box-login">
              <input type="checkbox" name="rememberMe"  required/>
              <strong> J’accepte les conditions d'utilisation et la politique de confidentialité   </strong>
            </div>
        <div className="sub-text-register">
          <small>
           Vos données personnelles seront utilisées pour soutenir votre expérience sur ce site Web pour gérer l'accés à votre compte et à d'autres fins décrites dans votre politique de confidentialité.
          </small>
        </div>
        <button type="submit">
        
            <strong>Inscription</strong>
          
        </button>
      </form>
    </div>
  );
}


export default Register;
