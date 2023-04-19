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
        <div class="mode" onClick={handleDivClick}  >
        <span class="light">Light</span>
     <span class={divClass}></span>
  
     <span class="dark">Dark</span>
      
      </div>
      );
}

export default Mode;