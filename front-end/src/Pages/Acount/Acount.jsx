import React from "react";
import Ads from "../../Components/Ads/Ads";
import Footer from "../../Components/Footer/Footer";
import Login from "../../Components/Login/Login";
import Navbar from "../../Components/Navbar/Navbar";
import Register from "../../Components/Register/Register";
import TopSelll from "../../Components/TopSelll/TopSelll";
import User from "../../Components/User/User";
import "./Acount.css";

function Acount(isDarkMode) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const p=isDarkMode.isDarkMode
  return (
    <div className='account-container'>
      <Navbar p={p} />
      {isLoggedIn ? (
        <div>
          <div className="account-center">
            <User
              user_name='Anis'
              phone_number='055423482'
              address='boumerdess ,alger ,14,200'
              image='https://demo2.chethemes.com/electro-dokan/wp-content/uploads/2018/01/cropped-1_widget_john-doe.jpg'
            />
          </div>

          <div className="home-bottom">
            <TopSelll />
            <Ads
              uri='https://electro.madrasthemes.com/wp-content/uploads/2019/04/footer-widget-img-01.jpg'
            />
          </div>
        </div>
      ) : (
        <div className="account-center">
          <Login />
          <div className="line-account">
            <div className="or">
              <strong>or</strong>
            </div>
          </div>
          <Register />
        </div>
      )}
      <Footer  p={p} />
    </div>
  );
}


export default Acount;
