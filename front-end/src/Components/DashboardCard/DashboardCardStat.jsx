import "./DashboardCard.css";
import imagestat from "../../assets/Svg/google-analytics-icon.svg";
const DashboardCardStat = () => {
  const handleopen = () => {
    console.log(
      window.open(
        "https://analytics.google.com/analytics/web/?authuser=5#/p386017333/reports/intelligenthome?params=_u..nav%3Dmaui"
      )
    );
  };

  return (
    <>
      <div className="DashboardCard google_stats" onClick={handleopen}>
        <div className="DashboardCard_right ">
          <img src={imagestat} alt="error" />
        </div>
      </div>
    </>
  );
};

export default DashboardCardStat;
