import React from 'react'
import { useState } from 'react';
import { AiOutlineMore,AiFillDelete,AiOutlineUser } from "react-icons/ai";
import "./UserList.css"
import axios from "axios"

function UsersList({number,id,date,name,email,order}) {
 
  const [action, setAction] = useState("action active-action")
  const handelaction=()=>{
   if(action==="action active-action"){
    setAction("action ")
    
   }
   else{
    setAction("action active-action")
   
   }
  }
  return (
    <div className='dashboard_titles'>
        <li>{number}</li>
        <li>{id}</li>
        <li>{date}</li>
        <li>{name}</li>
        <li>{email}</li>
        <li className="action-li" ><AiOutlineMore onClick={handelaction}/>

        <div className={action}><span className='dashbord-ic'><AiOutlineUser/> User</span>
        <span className='dashbord-ic'><AiFillDelete/> Delete</span></div>
        </li>
        
        
    </div>
  )
}

export default UsersList