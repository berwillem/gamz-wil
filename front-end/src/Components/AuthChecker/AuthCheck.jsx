import NotLog from "./NotLog";

const AuthCheck = ({ component: Component }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log("isLoggedIn:", isLoggedIn);
  if (isLoggedIn === "true") {
    return <Component />;
  } else {
    return <NotLog />;
  }
};

export default AuthCheck;
