import { Helmet } from "react-helmet";
import Update_user from "../../Components/Update_user/Update_user";

function Account_details() {
  return (
    <div className="account-container">
          <Helmet>
        <title>Update Profil | gamz</title>
      </Helmet>
      <Update_user />
    </div>
  );
}

export default Account_details;
