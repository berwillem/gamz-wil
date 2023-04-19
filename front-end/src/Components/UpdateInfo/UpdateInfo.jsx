import React from 'react';
import "./UpdateInfo.css"
import { Link } from "react-router-dom";
const UpdateInfo = () => {
    return (
        <div className='update-info-check'>
            <h3>veuillez completer votre inscription en remplissant votre profile !</h3>
            <Link to="/Details">
            <button className='check-button'>Mettre a jour mon profile</button>
            </Link>
        </div>
    );
};

export default UpdateInfo;