import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./PassForgot2.css";
import Swal from "sweetalert2";
import { passwordReset } from "../../services/Auth";
const baseURL = import.meta.env.VITE_BASE_URL;

const PassForgot2 = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const userId = searchParams.get("id");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Le mot de passe n'est pas identique !",
        text: "rentrez a nouveau le mot de pass!",
      });
      return;
    }
    try {
      //TODO: test it
      const response = await passwordReset(token, userId, password)
      Swal.fire("opération réussite!", "mot de pass mis a jour!", "success");
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "erreur : !",
        text: error.response.data.error,
      });
    }
  };

  return (
    <div className="password-reset">
      <div className="password-reset-header">
        <h1 className="password-reset-title">Reset Password</h1>
      </div>
      <form className="password-reset-form" onSubmit={handleSubmit}>
        <div className="password-reset-input-container">
          <label className="password-reset-label" htmlFor="password">
            New Password:
          </label>
          <input
            className="password-reset-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="password-reset-input-container">
          <label className="password-reset-label" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            className="password-reset-input"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="password-reset-button" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default PassForgot2;
