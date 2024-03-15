import "./DashboardCard.css";

function DashboardCard({ title, number, url }) {
  return (
    <div className="DashboardCard">
      <div className="DashboardCard_right">
        <img src={url} alt="" />
      </div>
      <div className="DashboardCard_left">
        <strong>{title}</strong>
        <small>{number}</small>
      </div>
    </div>
  );
}

export default DashboardCard;
