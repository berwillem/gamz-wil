import './App.css'
import React, { useState} from 'react'
import Home from './Pages/Home/Home'
import {Route, Routes} from 'react-router-dom'
import Acount from './Pages/Acount/Acount'
import Postdetails from './Pages/PostDetails/Postdetails'
import ADdPost from './Pages/ADdPost/ADdPost'
import Dashbord from './Pages/Dashbord/Dashbord'
import Otp from './Pages/Otp/Otp'
import PassForgot from './Pages/PassForgot/PassForgot'
import Account_details from './Pages/Acount_details/Account_details'
import PassForgot2 from './Pages/PassForgot/PassForgot2'
import Mode from './Components/Mode/Mode'
import Contact from './Pages/Contact/Contact'
import Page404 from './Pages/page404/Page404'
import PubManage from './Pages/PubManage/PubManage'



function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
const toggleDarkMode = () => {
  setIsDarkMode(!isDarkMode);
  
}

    return (
        <div className={isDarkMode ? 'dark-mode' : ''}  style={{backgroundColor: `var(--background-color) `, color: `var(--text-color)`,fill:`var(--text-color)`}}>
            
  
            <Routes>
                <Route path='/'
                    element={<Home isDarkMode={isDarkMode} />}/>
                <Route path='/Account'
                    element={<Acount isDarkMode={isDarkMode} />}/>
                <Route path='/postDetails/:id'
                    element={<Postdetails isDarkMode={isDarkMode}/>}/>
                <Route path='/createPost'
                    element={<ADdPost isDarkMode={isDarkMode} />}/>
                <Route path='/dashboard'
                    element={<Dashbord />}/>
                <Route path='/otp'
                    element={<Otp isDarkMode={isDarkMode}/>}/>
                <Route path='/pub-manage'
                    element={<PubManage />}/>
                <Route path='/PassForgot'
                    element={<PassForgot/>}/>
                <Route path='/PassForgot2'
                    element={<PassForgot2/>}/>
                <Route path='/contact'
                    element={<Contact isDarkMode={isDarkMode}/>}/>
                <Route path='/Details'
                    element={<Account_details isDarkMode={isDarkMode}/>}/>
                <Route path='*'
                    element={<Page404  isDarkMode={isDarkMode}s/>}/>
            </Routes>
            {!window.location.pathname.includes('/pub-manage') && <Mode toggleDarkMode={toggleDarkMode} />}
        </div>

    )
}

export default App
