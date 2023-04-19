import { Power3 } from 'gsap';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react'
import Dashboard from '../../Components/Dashbord/Dashboard';
import { GetAllUsers, baseUrl } from '../../redux/reducers/users';
import axios from 'axios';
function Dashbord() {
    gsap.registerPlugin(ScrollTrigger);
    const [users, setUsers] = useState([])


    const cardContainer = useRef();
    const cardContainer2 = useRef();
    const cardContainer3 = useRef();
    useEffect(() => {
        gsap.to(cardContainer2.current, {
            y: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: cardContainer2.current
        })
        gsap.to(cardContainer3.current, {
            y: 10,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: cardContainer3.current
        })
        gsap.to(cardContainer.current, {
            x: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: cardContainer.current
        })
    }, [])

    useEffect(() => {
        const getUsers = async () => {
          try {
            const res = await axios.get(baseUrl+"/");
            console.log(res.data);
            setUsers(res.data)
            dispatch(GetAllUsers(res.data));
          } catch (err) {
            console.log(err);
          }
        };
        getUsers();
      }, []);
    
  return (
    
          <div className='home-container' style={{height:'100vh'}}>
         
                
                <div style={
                        {
                            opacity: 0,
                            transform: 'translateY("100px")',
                            width:'100%'

                        }
                    }
                    ref={cardContainer3}>
                        <Dashboard users={users}/>
                   
               
            </div>

        </div>
   
  )
}

export default Dashbord