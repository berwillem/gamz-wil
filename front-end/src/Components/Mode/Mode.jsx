import { useDispatch, useSelector } from "react-redux";
import "./Mode.css";
import { useState } from "react";
import { toggleLight } from "../../redux/reducers/LightSlice";
function Mode() {
  const dispatch = useDispatch();
  const light = useSelector((state) => state.light.value);

  //state
  const handleToggle = () => {
    dispatch(toggleLight());
  };

  return (
    <div className="mode" onClick={handleToggle}>
      <span className="light">Clair</span>
      <span className={!light?'toggle':"toggle active2"}></span>

      <span className="dark">Sombre</span>
    </div>
  );
}

export default Mode;
