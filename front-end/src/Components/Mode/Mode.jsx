import './Mode.css'
import React, {useState} from 'react';
function Mode(props) {
  
    const [divClass, setDivClass] = useState('toggle');
    function handleDivClick() {
        if (divClass === 'toggle') {
          setDivClass('toggle active2');
          props.toggleDarkMode()
        } else {
          setDivClass('toggle');
          props.toggleDarkMode()
        }
      }
     
    return (
        <div className="mode" onClick={handleDivClick}  >
        <span className="light">Clair</span>
     <span className={divClass}></span>
  
     <span className="dark">Sombre</span>
      
      </div>
      );
}

export default Mode;