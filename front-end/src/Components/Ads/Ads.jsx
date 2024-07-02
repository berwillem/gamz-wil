import "./Ads.css";
import pubImg from "../../assets/images/pub.webp";
import { useEffect, useState } from "react";
import { getSidePub } from "../../services/Pubs";
function Ads({ad}) {
  const [image, setImage] = useState(undefined)
  const [url, setUrl] = useState(undefined)
  useEffect(()=> {
    getSidePub(ad).then(res => {
      setImage(res.data.url)
      setUrl(res.data.redirect)
    })
  }, [])
  return (
    <div className="Ads-container">
      <a href={url}>

      <img src={image} alt="pub-image" />
      </a>
    </div>
  );
}

export default Ads;
