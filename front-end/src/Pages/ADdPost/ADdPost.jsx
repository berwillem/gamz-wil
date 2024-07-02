import AddPost from "../../Components/AddPost/AddPost";
import Ads from "../../Components/Ads/Ads";
import TopSelll from "../../Components/TopSelll/TopSelll";
import { Helmet } from "react-helmet";
function ADdPost() {
  return (
    <>
      <Helmet>
        <title>Add Post</title>
      </Helmet>
      <div>
        <AddPost />
        <div className="home-bottom">
          <TopSelll />
          <Ads />
        </div>
      </div>
    </>
  );
}

export default ADdPost;
