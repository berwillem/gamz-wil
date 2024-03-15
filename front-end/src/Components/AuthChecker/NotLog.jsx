import { Link } from "react-router-dom";

const NotLog = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "var(--background-color)",
  };

  const headingStyle = {
    fontSize: "2rem",
    marginBottom: "2rem",
    textAlign: "center",
    color: "var(--text-color)",
  };

  const loginButtonStyle = {
    backgroundColor: "tomato",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "0.75rem 1.5rem",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const loginButtonHoverStyle = {
    backgroundColor: "red",
  };
  const userId = JSON.parse(localStorage.getItem("user"))?.id || null;

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Please Log in with an Admin account first</h1>
      <Link
        to={`/account/${userId}`}
        style={loginButtonStyle}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor =
            loginButtonHoverStyle.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = loginButtonStyle.backgroundColor)
        }
      >
        Go to login
      </Link>
    </div>
  );
};

export default NotLog;
