import React, { useState } from 'react'
import {AiOutlineDashboard, AiOutlineHome} from 'react-icons/ai'
import {CiUser} from 'react-icons/ci'
import {MdOutlineLogout} from 'react-icons/md'
import DashboardCard from '../DashboardCard/DashboardCard'
import './Dashboard.css'
import UsersList from '../Users_list/UsersList'
import image from '../../assets/Svg/shape.svg'
import { Link } from 'react-router-dom'

function Dashboard({users}) {
    const [num, setNum] = useState(0)
    return (
        <div className='dashboard-container'>

            <div className="dashboard_l">
                <div className="user-l-dashboard">

                    <li><Link to='/' style={{display:'flex',justifyContent:'space-between',width:'100%'}}>

                        Home
                        <AiOutlineHome/>
                    </Link>
                    </li>
                    <li><Link to='/Pub-manage' style={{display:'flex',justifyContent:'space-between',width:'100%'}}>

                        pub managment
                        <AiOutlineDashboard/>
                    </Link>
                    </li>
                    <li><Link to='/Details' style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                        Account details
                        <CiUser/>
                        </Link>
                    </li>
                    <li>Logout
                        <MdOutlineLogout/>
                    </li>
                </div>

            </div>
            <div className="user_dashboard_right">
                <div className="dashboard_card_container">
                    <DashboardCard
                    title='total Users'
                    number='32.342'
                    url={image}/>
                    <DashboardCard
                    title='total Users'
                    number='32.342'
                    url={image}/>
                    <DashboardCard
                    title='total Users'
                    number='32.342'
                    url={image}/>
                    <DashboardCard
                    title='total Users'
                    number='32.342'
                    url={image}/>

                </div>
                <div className="dashboard_container">
                    <div className="dashboard_title">
                        <p>Users List</p>
                    </div>
                    <div className="dashboard_titles">
                        <li>No</li>
                        <li>ID</li>
                        <li>Date</li>
                        <li>Name</li>
                        <li>email</li>
                        <li>order</li>
                        <li>action</li>
                    </div>
                    {
                        console.log(users)
                      }
                    <div className="dashboard_users">
                        {
                            users.map((item ,index)=>(

                                <UsersList
                               
                                name={item.username}
                                number={num +1}
                                id={item._id}
                                order={item.order}
                                date={item.createdAt.slice(0,10)}
                                email={item.email}/>
                            ))
                        }

                    </div>
                </div>
            </div>


        </div>
    )
}

export default Dashboard
