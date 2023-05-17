import React from 'react';
import { Link } from 'react-router-dom';

const NotLog = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
    };

    const headingStyle = {
        fontSize: '2rem',
        marginBottom: '2rem',
        textAlign: 'center',
    };

    const loginButtonStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '0.75rem 1.5rem',
        fontSize: '1.2rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const loginButtonHoverStyle = {
        backgroundColor: '#0062cc',
    };

    return (
        <div style={containerStyle}>
           <h1 style={headingStyle}>Please log in with an admin account first</h1>
           <Link 
            to="/account" 
            style={loginButtonStyle} 
            onMouseEnter={(e) => e.target.style.backgroundColor = loginButtonHoverStyle.backgroundColor} 
            onMouseLeave={(e) => e.target.style.backgroundColor = loginButtonStyle.backgroundColor}
            >
               Go to login
           </Link>
        </div>
    );
};

export default NotLog;
