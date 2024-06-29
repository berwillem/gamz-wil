import AddPost from "../../Components/AddPost/AddPost";
import Ads from "../../Components/Ads/Ads";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import TopSelll from "../../Components/TopSelll/TopSelll";


function ADdPost() {
 
  return (
    <div>
    
      <AddPost />
      <div className="home-bottom">
        <TopSelll />
        <Ads />
      </div>
  
    </div>
  );
}

export default ADdPost;
