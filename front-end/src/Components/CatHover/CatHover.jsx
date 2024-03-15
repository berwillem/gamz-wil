import "./CatHover.css";

function CatHover({ title, sub_cat }) {
  return (
    <div className="hover-container ">
      <div className="hover-content">
        <div className="hover-title">
          <strong>laptop</strong>
        </div>
        <ul>
          <li>air m1 pro</li>
          <li>deel</li>
          <li>think pad</li>
        </ul>
      </div>
      <div className="hover-content">
        <div className="hover-title">
          <strong>consoles</strong>
        </div>
        <ul>
          <li>xbox 360</li>
          <li>ps 4</li>
          <li>think pad</li>
        </ul>
      </div>
    </div>
  );
}

export default CatHover;
