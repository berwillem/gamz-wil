import './App.css'
import React, {useEffect, useState, useRef} from 'react'
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
import Mode from './Components/Mode/mode'
import Contact from './Pages/Contact/Contact'
import Page404 from './Pages/page404/Page404'



function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
const toggleDarkMode = () => {
  setIsDarkMode(!isDarkMode);
  
}

    return (
        <div className={isDarkMode ? 'dark-mode' : ''}  style={{backgroundColor: `var(--background-color) `, color: `var(--text-color)`,fill:`var(--text-color)`}}>
            
   <Mode toggleDarkMode={toggleDarkMode} />
            <Routes>
                <Route path='/'
                    element={<Home isDarkMode={isDarkMode} />}/>
                <Route path='/Account'
                    element={<Acount isDarkMode={isDarkMode} />}/>
                <Route path='/postDetails'
                    element={<Postdetails isDarkMode={isDarkMode}/>}/>
                <Route path='/createPost'
                    element={<ADdPost isDarkMode={isDarkMode} />}/>
                <Route path='/dashboard'
                    element={<Dashbord />}/>
                <Route path='/otp'
                    element={<Otp isDarkMode={isDarkMode}/>}/>
                <Route path='/PassForgot'
                    element={<PassForgot/>}/>
                <Route path='/PassForgot2'
                    element={<PassForgot2/>}/>
                <Route path='/contact'
                    element={<Contact isDarkMode={isDarkMode}/>}/>
                <Route path='/Details'
                    element={<Account_details isDarkMode={isDarkMode}/>}/>
                <Route path='*'
                    element={<Page404/>}/>
            </Routes>

        </div>

    )
}

export default App
