import React from 'react'

function UsersList({number,id,date,name,email,order}) {
  return (
    <div className='dashboard_titles'>
        <li>{number}</li>
        <li>{id}</li>
        <li>{date}</li>
        <li>{name}</li>
        <li>{email}</li>
        <li>{order}</li>
        
        
    </div>
  )
}

export default UsersList