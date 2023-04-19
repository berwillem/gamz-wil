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
        <p>Login</p>
      </div>
      <div className="sub-title-login">
        <p>Welcome back! Sign in to account.</p>
      </div>
      {error && <p className="error-message">{error}</p>}
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="">
              <strong>Username or email address *</strong>
              <Field type="email" name="email" placeholder="write your email" />
              <ErrorMessage name="email" component="div" className="error" />
            </label>
            <label>
              <strong>Password *</strong>
              <Field
                type="password"
                name="password"
                placeholder="write your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error"
              />
            </label>

            <div className="check-box-login">
              <Field type="checkbox" name="rememberMe" />
              <strong>Remember me</strong>
            </div>
            <button type="submit" disabled={isSubmitting}>
              <strong>Log in</strong>
            </button>
            <Link to="/PassForgot">Lost your password ?</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
