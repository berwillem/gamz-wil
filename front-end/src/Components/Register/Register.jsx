import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import { register } from "../../redux/reducers/Auth";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        <p>Enregistrer</p>
      </div>
      <div className="sub-title-register">
        <p>Bienvenue, créez votre compte.</p>
      </div>

      {error && <div className="error-message">{error}</div>} 
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <strong>Nom d'utilisateur ou addresse e-mail *</strong>
          <input
            name="Username"
            value={username}
            type="text"
            placeholder="write your Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <strong>addresse e-mail *</strong>
          <input
            name="Email"
            value={email}
            type="email"
            placeholder="write your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <strong>Mot de passe *</strong>
          <input
            name="password"
            value={password}
            type="password"
            placeholder="write your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="check-box-login">
              <input type="checkbox" name="rememberMe"  required/>
              <strong> accepter Conditions d'utilisation et la Politique de confidentialité  </strong>
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
