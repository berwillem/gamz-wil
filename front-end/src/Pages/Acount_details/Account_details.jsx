import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Update_user from "../../Components/Update_user/Update_user";

function Account_details(isDarkMode) {
  const p = isDarkMode.isDarkMode;
  return (
    <div className="account-container">
      <Navbar p={p} />
      <Update_user />
      <Footer p={p} />
    </div>
  );
}

export default Account_details;
