import NotLog from "./NotLog";
import { useSelector } from "react-redux";

const AuthCheck = ({ component: Component }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const isAdmin = useSelector((state) => state.auth.isAdmin);
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
