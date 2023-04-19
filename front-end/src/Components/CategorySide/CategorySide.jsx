import React, { useState } from 'react'
import {AiOutlineRight} from 'react-icons/ai'
import CatHover from '../CatHover/CatHover'
import './CategorySide.css'
import cat_img from "../../assets/images/PICS/img1.png";
import cat_img2 from "../../assets/images/PICS/img2.png";
import cat_img3 from "../../assets/images/PICS/img3.png";
import cat_img4 from "../../assets/images/PICS/img4.png";
import cat_img5 from "../../assets/images/PICS/img5.png";


const Categoryes = [
    {
        id: 1,
        name: 'informatique'
    },
    {
        id: 2,
        name: 'Consoles'
    },
    {
        id: 3,
        name: 'jeux video'
    },
    {
        id: 4,
        name: 'Contenu Digital'
    }, {
        id: 5,
        name: 'Télephonie'
    },
]

function CategorySide() {


    const [style, setStyle] = useState('cat-hoverContainer')


    return (
        <div className='category-side-container'>
            <div className="category-side-title">
                <h4>Categories</h4>
            </div>
            <div className="category-side">
            
            <li > 
              <p>
                Informatique
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
              <div className="hover-drop-down informatique">
              <ul className='pc-bureau'>
                  <li className='drop-down-titel'>PC Bureau </li>
              <li>Config PC</li>
              <li>Composants</li>
              <li></li>
                </ul>
                
                <ul className='connectique1'>
                  <li className='drop-down-titel '>CONNECTIQUE/PERIPHE </li>
                  <li>	Clavier</li>
                  <li> Souris </li>
                  <li> Casque</li>
                 <li>  Micro</li>
                  <li> 	Webcam / Streaming
                    VR</li>
                    	<li>Câbles</li>
                      <li>	Divers/ Autres</li>

              
                </ul>
                <ul className='connectique2'>
                  <li className='drop-down-titel'>PC Portable/ LAPTOB</li>
              
                </ul>
                 <img className='img-cat' src={cat_img3} alt="cat_img" />
               
              
                
               
              </div>
            </li>
            <li  >
              <p>
              	Consoles
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
              <div className="hover-drop-down consoles">
                <ul className='ps'>
                  <li className='drop-down-titel'>Sony/Playstation</li>
                  <li>Playstation 5</li>
                  <li>Accessoires Playstation 5</li>
                  <li>Playstation 4</li>
                  <li>Accessoires Playstation 4</li>
                  <li>Playstation 3</li>
                </ul>
                <ul className='xb'>
                  <li className='drop-down-titel'>Xbox</li>
                  <li>Xbox Series X|S</li>
                  <li>Xbox One</li>
                  <li>Xbox 360</li>
                  
                </ul>
                <ul className='nint'>
                  <li className='drop-down-titel'>Nintendo</li>
                  <li>Nintendo Switch</li>
                  <li>Nintendo Switch Lite</li>
                  <li>Nintendo Switch OLED</li>
                  
                  
                </ul>
                <ul className='retro'>
                  <li className='drop-down-titel'>retro</li>
                  <li>Playstation</li>
                  <li>Xbox</li>
                  <li>Nintendo</li>
                  <li>autres</li>
                  
                  
                </ul>
                <ul className='desk'>
                  <li className='drop-down-titel'>Steam Desk</li>
               
                </ul>
                <img className='img-cat' src={cat_img} alt="cat_img" />
              </div>
            </li>
            <li >
              <p>
              	Jeux Vidéos 
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
              <div className="hover-drop-down jeux">
                <ul className='jeux-ps'>
                  <li className='drop-down-titel'>Jeux Vidéos physique Playstation</li>
                 
                  <li>Playstation 5</li>
                  <li>Playstation 4</li>
                </ul>
                <ul className='jeux-xb'>
                  <li className='drop-down-titel'>	Jeux Vidéos physique xbox</li>
                
                  <li>Xbox Series X|S</li>
                  <li>Xbox One</li>
                </ul>
                <ul className='jeux-nint'> 
                  <li className='drop-down-titel'>	Jeux Vidéos physique Nintendo</li>
               
                  <li>Nintendo Switch</li>
                </ul>
                <ul className='pack'>
                  <li className='drop-down-titel'>Packs Collectors</li>
                </ul>
                <ul className='p-derive'>
                  <li className='drop-down-titel'>Produit Dérivés </li>
                  <li>Figurines </li>
                  <li>Mangas / BD</li>
                  <li>Autres</li>
                </ul>
                <img className='img-cat' src={cat_img4} alt="cat_img" />
              </div>
            </li>
            <li >
              <p>
              	Contenu Digital / Téléchargeable 
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
              <div className="hover-drop-down deg">
                <ul className='deg-jeux'>
                  <li className='drop-down-titel'>Jeux Vidéos </li>
                  <li>jeux video Playstation</li>
                  <li>jeux video Xbox</li>
                
                </ul>
                <ul className='deg-abo'>
                  <li className='drop-down-titel '>Abonnements « Code Digitale » </li>
                  <li>PS plus</li>
                  <li>Xbox live</li>
                  <li>autres</li>
                </ul>
                <ul className='deg-compte'>
                  <li className='drop-down-titel '>Comptes </li>
                  <li>jeux Xbox</li>
                  <li>Abonnements Xbox </li>
                  <li>autres</li>
                </ul>
                <ul className=' deg-card'>
                  <li className='drop-down-titel'> gift card  </li>
                  <li>PSN</li>
                  <li>Xbox</li>
                  <li>Steam</li>
                  <li>Blizzard</li>
                  <li>Riot</li>
                  <li>Nintendo eShop</li>
                  <li>Goggle play</li>
                  <li>Apple iTunes</li>
                  <li>Netflix</li>
                  <li>Spotify</li>
                  <li>Amazon</li>
                  <li>Autres</li>
                </ul>
                <img className='img-cat' src={cat_img2} alt="cat_img" />
              </div>
            </li>
            <li>
              <p>
              Téléphonie 
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
              <div className="hover-drop-down tel">
                <ul className='marque'>
                  <li className='drop-down-titel'>Marques </li>
                  <li>iphone</li>
                  <li>Samsung</li>
                  <li>Xiaomi</li>
                  <li>Oppo</li>
                  <li>Realme</li>
                  <li>Oneplus</li>
                  <li>POCO</li>
                  <li>Huawei</li>
                  <li>autres</li>
                </ul>
                <ul className='OC'>
                  <li className='drop-down-titel'>Objets Connectés </li>
                  <li>Montre Connectée</li>
                  <li>Bracelet Connecté</li>
                  <li>Ecouteurs sans fils</li>
                  <li>Casque</li>
                  <li>Autres</li>
             
                </ul>
                <ul className='a-tel'>
                  <li className='drop-down-titel'>Accessoires Téléphonie</li>
                  <li>Cables</li>
                  <li>Chargeur</li>
                  <li>Case/anti-choc</li>
                  <li>Divers/Autres</li>
                </ul>
                <img className='img-cat' src={cat_img5} alt="cat_img" />
              </div>
            </li>
           
        
        
              </div>
        </div>
    )
}

export default CategorySide
