import "./App.css";
import { useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Mode from "./Components/Mode/Mode";
import Home from "./Pages/Home/Home";
import Account from "./Pages/Acount/Acount";
import Postdetails from "./Pages/PostDetails/Postdetails";
import AddPost from "./Pages/ADdPost/ADdPost";
import Dashboard from "./Pages/Dashbord/Dashbord";
import PubManage from "./Pages/PubManage/PubManage";
import AccountDetails from "./Pages/Acount_details/Account_details";
import PubManageMobile from "./Components/PubManageMobile/PubManageMobile";
// import Otp from "./Pages/Otp/Otp";
import PassForgot from "./Pages/PassForgot/PassForgot";
import PassForgot2 from "./Pages/PassForgot/PassForgot2";
import Page404 from "./Pages/page404/Page404";
import Contact from "./Pages/Contact/Contact";
import AuthCheck from "./Components/AuthChecker/AuthCheck";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const location = useLocation();
  const excludePaths = ["/pub-manage", "/pub-manage-mobile", "/dashboard"];
  const shouldDisplayMode = !excludePaths.includes(location.pathname);

  return (
    <div
      className={isDarkMode ? "dark-mode" : ""}
      style={{
        backgroundColor: `var(--background-color) `,
        color: `var(--text-color)`,
        fill: `var(--text-color)`,
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route
            path="/Account/:userId"
            element={<Account isDarkMode={isDarkMode} />}
          />
          <Route
            path="/postDetails/:id"
            element={<Postdetails isDarkMode={isDarkMode} />}
          />
          <Route
            path="/createPost"
            element={<AddPost isDarkMode={isDarkMode} />}
          />
          {/* <Route path="/otp" element={<Otp isDarkMode={isDarkMode} />} /> */}
          <Route
            path="/dashboard"
            element={<AuthCheck component={Dashboard} />}
          />
          <Route
            path="/pub-manage"
            element={<AuthCheck component={PubManage} />}
          />
          <Route
            path="/pub-manage-mobile"
            element={<AuthCheck component={PubManageMobile} />}
          />

          <Route path="/PassForgot" element={<PassForgot />} />
          <Route path="/PassForgot2" element={<PassForgot2 />} />
          <Route
            path="/contact"
            element={<Contact isDarkMode={isDarkMode} />}
          />
          <Route
            path="/Details"
            element={<AccountDetails isDarkMode={isDarkMode} />}
          />
          <Route path="*" element={<Page404 isDarkMode={isDarkMode} />} />
        </Routes>
      </Suspense>
      {shouldDisplayMode && <Mode toggleDarkMode={toggleDarkMode} />}
    </div>
  );
}

export default App;
