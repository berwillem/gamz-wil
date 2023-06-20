import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { login } from "../../redux/reducers/Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (values) => {
    dispatch(login(values))
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Registration error:", error.response.data.error);
        setError(error.response.data.error);
      });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
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
        <p>Content de te revoir ! connectez-vous à votre compte</p>
      </div>
      {error && <p className="error-message">{error}</p>}
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <label htmlFor="">
              <strong>Nom d'utilisateur ou addresse e-mail *</strong>
              <Field type="email" name="email" placeholder="écrirvez votre nom d'utilisateur"  />
              <ErrorMessage name="email" component="div" className="error" />
            </label>
            <label>
              <strong>Mot de passe *</strong>
              <Field
        
                type="password"
                name="password"
                placeholder="écrirvez votre mot de passe"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error"
              />
            </label>

            <div className="check-box-login">
              <Field type="checkbox" name="rememberMe" />
              <strong>Se rappeller de moi</strong>
            </div>
            <button type="submit"  >
              <strong>Connexion</strong>
            </button>
            <Link to="/PassForgot">Mon de passe oublié ?</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
