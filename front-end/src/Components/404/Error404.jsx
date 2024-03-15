import image404 from "../../assets/Svg/undraw_cancel_re_pkdm.svg";
import "./Error404.css";
const Error404 = () => {
  return (
    <div className="error-404">
      <h1>page not found !</h1>
      <img src={image404} alt="404 error" />
    </div>
  );
};

export default Error404;
