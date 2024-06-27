import "./App.css";
import { lazy, Suspense } from "react";
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
import PassForgot from "./Pages/PassForgot/PassForgot";
import PassForgot2 from "./Pages/PassForgot/PassForgot2";
import Page404 from "./Pages/page404/Page404";
import Contact from "./Pages/Contact/Contact";
import AuthCheck from "./Components/AuthChecker/AuthCheck";
import { useSelector } from "react-redux";
import MainLayout from "./Layout/MainLayout";
 // Importez votre layout

function App() {
  const light = useSelector((state) => state.light.value);
  const location = useLocation();
  const excludePaths = ["/pub-manage", "/pub-manage-mobile", "/dashboard"];
  const shouldDisplayMode = !excludePaths.includes(location.pathname);

  return (
    <div
      className={light ? "dark-mode" : ""}
      style={{
        backgroundColor: `var(--background-color) `,
        color: `var(--text-color)`,
        fill: `var(--text-color)`,
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Account/:userId" element={<Account />} />
            <Route path="/postDetails/:id" element={<Postdetails />} />
            <Route path="/createPost" element={<AddPost />} />
            <Route path="/PassForgot" element={<PassForgot />} />
            <Route path="/PassForgot2" element={<PassForgot2 />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Details" element={<AccountDetails />} />
            <Route path="*" element={<Page404 />} />
          </Route>
          <Route path="/dashboard" element={<AuthCheck component={Dashboard} />} />
          <Route path="/pub-manage" element={<AuthCheck component={PubManage} />} />
          <Route path="/pub-manage-mobile" element={<AuthCheck component={PubManageMobile} />} />
        </Routes>
      </Suspense>
      {shouldDisplayMode && <Mode />}
    </div>
  );
}

export default App;
