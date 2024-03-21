import "./App.css";
import { useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Mode from "./Components/Mode/Mode";

// Lazy load components for routes
const Home = lazy(() => import("./Pages/Home/Home"));
const Account = lazy(() => import("./Pages/Acount/Acount"));
const Postdetails = lazy(() => import("./Pages/PostDetails/Postdetails"));
const AddPost = lazy(() => import("./Pages/ADdPost/ADdPost"));
const Dashboard = lazy(() => import("./Pages/Dashbord/Dashbord"));
const Otp = lazy(() => import("./Pages/Otp/Otp"));
const PassForgot = lazy(() => import("./Pages/PassForgot/PassForgot"));
const AccountDetails = lazy(() =>
  import("./Pages/Acount_details/Account_details")
);
const PassForgot2 = lazy(() => import("./Pages/PassForgot/PassForgot2"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const Page404 = lazy(() => import("./Pages/page404/Page404"));
const PubManage = lazy(() => import("./Pages/PubManage/PubManage"));
const AuthCheck = lazy(() => import("./Components/AuthChecker/AuthCheck"));
const PubManageMobile = lazy(() =>
  import("./Components/PubManageMobile/PubManageMobile")
);

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
          <Route path="/otp" element={<Otp isDarkMode={isDarkMode} />} />
          <Route
            path="/dashboard"
            element={<AuthCheck component={<Dashboard />} />}
          />
          <Route
            path="/pub-manage"
            element={<AuthCheck component={<PubManage />} />}
          />
          <Route
            path="/pub-manage-mobile"
            element={<AuthCheck component={<PubManageMobile />} />}
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
