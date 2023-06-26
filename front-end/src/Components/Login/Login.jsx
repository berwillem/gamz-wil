import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { login } from "../../redux/reducers/Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Login.css";

function Login() {
  //state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // function submit
  const handleSubmit = (values) => {
    dispatch(login(values))
      .then(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const isVerified = user?.verified || false; 
        if (isVerified) {
          navigate("/");
        } else {
          localStorage.setItem('isLoggedIn', 'false');
          navigate("/otp");
        }
      })
      .catch((error) => {
        console.log("Registration error:", error.response.data.error);
        setError(error.response.data.error);
      });
  };
  // validation form
  const validate = (values) => {
    const errors = {};
    if (!values.emailOrUsername) {
      errors.emailOrUsername = "Email or username is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <div className="login-container">
      <div className="title-login">
        <p>Connexion</p>
      </div>
      <div className="sub-title-login">
        <p>Content de vous revoir ! connectez-vous à votre compte</p>
      </div>
      {error && <p className="error-message">{error}</p>}
      <Formik
        initialValues={{ emailOrUsername: "", password: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <label htmlFor="emailOrUsername">
              <strong>Nom d'utilisateur ou adresse e-mail *</strong>
              <Field
                type="text"
                name="emailOrUsername"
                placeholder="Entrez votre email ou nom d'utilisateur"
              />
              <ErrorMessage
                name="emailOrUsername"
                component="div"
                className="error"
              />
            </label>
            <label>
              <strong>Mot de passe *</strong>
              <Field
                type="password"
                name="password"
                placeholder="Entrez votre mot de passe"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </label>

            <div className="check-box-login">
              <Field type="checkbox" name="rememberMe" />
              <strong>Se rappeler de moi</strong>
            </div>
            <button type="submit">
              <strong>Connexion</strong>
            </button>
            <Link to="/PassForgot">Mot de passe oublié ?</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
