import NotLog from "./NotLog";

const AuthCheck = ({ component: Component }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isAdmin = JSON.parse(localStorage.getItem("user"))?.isAdmin;
  console.log(isAdmin);
  if (isLoggedIn) {
    if (isAdmin) {
      return <Component />;
    } else {
      // Render a component for non-admin users
      return <NotLog />;
    }
  } else {
    // Render a component for logged-out users
    return <NotLog />;
  }
};

export default AuthCheck;
