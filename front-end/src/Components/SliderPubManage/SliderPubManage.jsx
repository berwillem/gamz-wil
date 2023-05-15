import React, {useEffect, useState, useRef} from 'react'
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {gsap, Power3} from "gsap";
import './SliderPubManage.css'
import {AiFillRightCircle} from 'react-icons/ai'
import {CgCloseR, CgMenuGridO} from 'react-icons/cg'
import { AiOutlineRight,AiOutlineLeft } from "react-icons/ai";

const image1 = 'https://electro.madrasthemes.com/wp-content/uploads/2016/03/headphonecase.png'
const image2 = " https://electro.madrasthemes.com/wp-content/uploads/2016/03/usbheadphone.png"
const image3 = " https://electro.madrasthemes.com/wp-content/uploads/2016/03/cam4k-300x300.png"
const image4 = " https://electro.madrasthemes.com/wp-content/uploads/2016/03/watch-300x300.png"
const defaultBackground ="https://electro.madrasthemes.com/wp-content/uploads/2021/08/home-v10-swb-bg.jpeg"

function SliderPubManage({disp}) {
    const [show, setShow] = useState(true)
    const [display, setDisplay] = useState(disp)
    const [backgroundImage, setBackgroundImage] = useState([
        {
            src:defaultBackground
        },
        {
            src:defaultBackground
        },
        {
            src:defaultBackground
        }
    ]);
 const[index,setIndex]=useState(0)
 const handleBackgroundChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        const newImage = {
          src: imageUrl
        };
        const updatedImages = [...backgroundImage]; // Create a copy of the original array
        updatedImages[index] = newImage; // Update the image at the current index
        setBackgroundImage(updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };
  const switchback=(()=>{
    setIndex(index => index<backgroundImage.length -1? (index + 1):backgroundImage.length -1  );
  })
  const switchback2=(()=>{
    setIndex(index => index>0? (index - 1): 0 );
  })
    const [images, setImages] = useState([
        {
            id: 0,
            src: image1
        }, {
            id: 1,
            src: image2
        }, {
            id: 2,
            src: image3
        }, {
            id: 3,
            src: image4
        },
    ]);


    gsap.registerPlugin(ScrollTrigger);
    const subtitle = useRef();
    const subtitle2 = useRef();
    const subtitle3 = useRef();
    const title = useRef();
    const dot = useRef();
    const button = useRef();
    const cardContainer = useRef();
    const cardContainer2 = useRef();
    const cardContainer3 = useRef();


    useEffect(() => {
        gsap.to(subtitle.current, {
            y: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: subtitle.current
        })
        gsap.to(dot.current, {
            y: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: dot.current
        })
        gsap.to(button.current, {
            y: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: button.current
        })
        gsap.to(title.current, {
            y: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: title.current
        })
        gsap.to(cardContainer.current, {
            x: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: cardContainer.current
        })
        gsap.to(cardContainer2.current, {
            x: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: cardContainer2.current
        })
        gsap.to(cardContainer3.current, {
            y: 0,
            delay: 0.2,
            opacity: 1,
            duration: 1,
            ease: Power3.easeOut,
            scrollTrigger: cardContainer3.current
        })
    }, [])

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(currentImageIndex => (currentImageIndex + 1) % 4);
        }, 4000); // change slide every 5 seconds

        return() => clearInterval(interval);
    }, []);


    const handleImageUpdate = (index) => { // Show the update modal
        setSelectedImageIndex(index);
        setShowUpdateModal(true);
    }
    const handleUpdate = () => {
        setDisplay(true);
    };

    const handleDelete = (id) => {
        const updatedImages = images.filter((image) => image.id !== id);
        setImages(updatedImages);
    };

    const handleReplace = (id) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const updatedImages = images.map((image) => {
                    if (image.id === id) {
                        return {
                            ...image,
                            src: reader.result
                        };
                    } else {
                        return image;
                    }
                });
                setImages(updatedImages);
            };
        };
        input.click();

    };
    const [file, setFile] = useState(null);
    const [file2, setFil2] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                onImageChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange2 = (event) => {
        const file2 = event.target.files[0];
        if (file2) {
            setFil2(file2);
            const reader = new FileReader();
            reader.onload = () => {
                onImageChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubtitleClick = () => {
        const newSubtitle = prompt('Enter a new subtitle:');
        if (newSubtitle) {
          subtitle.current.innerText = newSubtitle;
        }
      };
    const handleSubtitleClick2 = () => {
        const newSubtitle = prompt('Enter a new subtitle:');
        if (newSubtitle) {
          subtitle2.current.innerText = newSubtitle;
        }
      };
    const handleSubtitleClick3 = () => {
        const newSubtitle = prompt('Enter a new subtitle:');
        if (newSubtitle) {
          subtitle3.current.innerText = newSubtitle;
        }
      };

    return (
        <div className='slider' style={{
           backgroundImage: `url(${backgroundImage[index].src})`,
           
          }}>
            
          
            <div className='dot'>
            {display && (
        
          <input type="file" accept="image/*" onChange={handleBackgroundChange}/>
        
      )}
      {
                        display ? <input type="file"
                            onChange={handleFileChange}/> : null
                    }
                     {
                        display ? <input type="file"
                            onChange={handleFileChange2}/> : null
                    }
                    <input type="button" value="entre text1"  onClick={handleSubtitleClick} />
                    <input type="button" value="entre text2"  onClick={handleSubtitleClick2} />
                    <input type="button" value="entre text3"  onClick={handleSubtitleClick3} />
            </div>
            
          
            <div className="R-C-sliderPub">
                <div className="L-slider">
                    <div ref={title}
                        className="title-slider">
                        <p>SHOP TO GET WHAT YOU LOVE</p>

                    </div>
                    <div className="sub-title">
                        <p ref={subtitle}
                           >
                            TIMEPIECES THAT
                            <br/>
                            MAKE A STATEMENT
                            <br/>
                            UP TO
                            <span>40% OFF</span>
                        </p>
                    </div>
                    <div className="buy-button">
                        <button ref={button}>
                            Start buying
                        </button>
                    </div>

                   
                </div>
                <div className="C-slider">


<img src={
        images[currentImageIndex].src
    }

    alt="Slideshow Image"
    ref={cardContainer3}
    className={
        `slideshow ${
            currentImageIndex !== 0 ? 'fade-in' : ''
        }`
    }/>

</div>
            </div>
            <div className="R-slider">
                <div ref={cardContainer}
                    className="box">
                    <div className="title-box">
                        <p ref={subtitle2}>CATCH BIG
                            <strong>
                                DEAL</strong>
                            ON
                            <br/>
                            THE CONSOLES</p>
                    </div>
                    <div className="sub-title-box">
                        
                        <strong>
                            Shop now
                        </strong>
                        <AiFillRightCircle size={20}
                            color='#e81a2a'/>
                        <div className="image-R-slide">
                            <img src={
                                    file ? URL.createObjectURL(file) : images[0].src
                                }
                                alt="image-slide"/>
                        </div>
                    </div>
                </div>
                <div className="box"
                    ref={cardContainer2}>
                    <div className="title-box">
                        <p ref={subtitle3}>CATCH BIG
                            <strong>
                                DEAL</strong>
                            ON
                            <br/>
                            THE CONSOLES</p>
                    </div>
                    <div className="sub-title-box">
                       
                        <strong>
                            Shop now
                        </strong>
                        <AiFillRightCircle size={20}
                            color='#e81a2a'/>
                        <div className="image-R-slide">
                            <img src={
                                    file2 ? URL.createObjectURL(file2) : images[1].src
                                }
                                alt="image-slide"/>
                        </div>
                    </div>

                </div>

            </div>
         <div className="switch">
         <AiOutlineLeft onClick={switchback2}/>
            <AiOutlineRight onClick={switchback}/>
         </div>

        </div>
    )
}

export default SliderPubManage
