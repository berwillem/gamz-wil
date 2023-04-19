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
        <p>Register</p>
      </div>
      <div className="sub-title-register">
        <p>Welcome back! Sign in to account.</p>
      </div>

      {error && <div className="error-message">{error}</div>} 
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <strong>Username or email address *</strong>
          <input
            name="Username"
            value={username}
            type="text"
            placeholder="write your Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <strong>Email address *</strong>
          <input
            name="Email"
            value={email}
            type="email"
            placeholder="write your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <strong>Password *</strong>
          <input
            name="password"
            value={password}
            type="password"
            placeholder="write your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <div className="sub-text-register">
          <small>
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our privacy policy.
          </small>
        </div>
        <button type="submit">
        
            <strong>Register</strong>
          
        </button>
      </form>
    </div>
  );
}


export default Register;
