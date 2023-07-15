import NotLog from "./NotLog";

const AuthCheck = ({ component: Component }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isAdmin = JSON.parse(localStorage.getItem("user"))?.isAdmin;
  if (isLoggedIn) {
    if (isAdmin) {
      return <Component />;
    } else {
      return <NotLog />;
    }
  } else {
    return <NotLog />;
  }
};

export default AuthCheck;
