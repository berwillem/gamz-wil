import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "./SliderPubManage.css"
import image from "../../assets/images.png"
import image2 from "../../assets/images/SMALL1.webp"
import image3 from "../../assets/images/SMALL2.webp"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { AiOutlineDashboard, AiOutlineHome } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';
export default function SliderPubManage() {
  const [pub, setPub] = useState([
    {image:image,title:"title",seconde:{image:image2,title:"title"},third:{image:image3,title:"title"}}])
    const [pub2, setPub2] = useState([
      {image:image,title:"title",seconde:{image:image2,title:"title"},third:{image:image3,title:"title"}}])
      console.log(pub);
    const addSlide=()=>{
      setPub([...pub,{image:image,title:"title",seconde:{image:image2,title:"title"},third:{image:image3,title:"title"}}])
      setPub2([...pub2,{image:image,title:"title",seconde:{image:image2,title:"title"},third:{image:image3,title:"title"}}])
    }


    const deletePub = (index) => {
      setPub(pub.filter((_, i) => i !== index));
      setPub2(pub2.filter((_, i) => i !== index));
    };
    const handleFileChange = (index, type, subIndex, event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newPub = [...pub];
          const newPub2 = [...pub2];
          if (type === 'main') {
            newPub[index].image = reader.result;
            newPub2[index].image = file;
          } else if (type === 'seconde') {
            newPub[index].seconde.image = reader.result;
            newPub2[index].seconde.image = file;
          } else if (type === 'third') {
            newPub[index].third.image = reader.result;
            newPub2[index].third.image = file;
          }
          setPub(newPub);
          setPub2(newPub2);
        };
        reader.readAsDataURL(file);
      }
    };
    const handleTitleChange = (index, type, event) => {
      const newPub = [...pub];
      const newPub2 = [...pub2];
      if (type === 'main') {
        newPub[index].title = event.target.value;
        newPub2[index].title = event.target.value;
      } else if (type === 'seconde') {
        newPub[index].seconde.title = event.target.value;
        newPub2[index].seconde.title = event.target.value;
      } else if (type === 'third') {
        newPub[index].third.title = event.target.value;
        newPub2[index].third.title = event.target.value;
      }
      setPub(newPub);
      setPub2(newPub2);
    };
 
  return (
    <div className="dashboard-container">

      <div className="dashboard_l">
        <div className="user-l-dashboard">
          <li>
            <Link
              to="/Dashboard"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              Home
              <AiOutlineHome />
            </Link>
          </li>
          <li>
            <Link
              to="/Pub-manage"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              pub management
              <AiOutlineDashboard />
            </Link>
          </li>
          <li>
            <Link
              to="/pub-manage-mobile"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              pub management mobile
              <AiOutlineDashboard />
            </Link>
          </li>
          <li>
            <Link
              to="/sidePub"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              side pub management 
              <AiOutlineDashboard />
            </Link>
          </li>
      
        </div>
       
      </div>
      <form className="user_dashboard_right">
      <div className="btn">
      <button type='button' onClick={addSlide}>addSlide</button>
      <button >valider le slide</button>
      </div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
       {pub.map((pub,index)=>(
         <SwiperSlide key={index}>
         <input type="file" className='bigimage' onChange={(e) => handleFileChange(index, 'main', null, e)} />
          <span onClick={()=>deletePub(index)} className='delete'>delete</span>
          <img src={pub.image} alt="" />
            <div className="infos">
          <div className="info_lefts">
          <input 
                    type="text" 
                    value={pub.title} 
                    onChange={(e) => handleTitleChange(index, 'main', e)} 
                    placeholder="Main Title"
                  />
          </div>
          <div className="info_rights">
        
          <div className="div"> <img src={pub.seconde.image} alt="" />    <input type="file" onChange={(e) => handleFileChange(index, 'seconde', 0, e)} />
          <input 
                      type="text" 
                      value={pub.seconde.title} 
                      onChange={(e) => handleTitleChange(index, 'seconde', e)} 
                   
                    />
          </div>
        
            <div className="div"><img src={pub.third.image} alt="" />        
             <input type="file" onChange={(e) => handleFileChange(index, 'third', 0, e)} />
             <input 
                      type="text" 
                      value={pub.third.title} 
                      onChange={(e) => handleTitleChange(index, 'third', e)} 
               
                    />
             </div>
          </div>
          </div>
         </SwiperSlide>
      
       ))}
      </Swiper>
      </form>
      
     
    </div>
  )
}
