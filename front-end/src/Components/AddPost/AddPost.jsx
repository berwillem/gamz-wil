import React, {useState} from 'react'
import {AiOutlineDashboard, AiOutlineHome} from 'react-icons/ai'
import {CiUser} from 'react-icons/ci'
import {MdOutlineLogout} from 'react-icons/md'
import Ads from '../Ads/Ads'
import './AddPost.css'
import image from '../../assets/Svg/undraw_image_post_re_25wd.svg'
import Select from 'react-select';
import {Link} from 'react-router-dom';
import {wilaya} from '../../Data/wilaya'

const costumeStyle = [{}]

const category = [
    {
        label: "All category",
        value: ""
    },
    {
        label: "Phone",
        value: "phone"
    },
    {
        label: "Laptop",
        value: "laptop"
    },
    {
        label: "Camera",
        value: "camera"
    }, {
        label: "Printer",
        value: "printer"
    },
]

const options = wilaya.map(wilaya => ({value: wilaya.name, label: wilaya.name}));

function AddPost() { // * state
    const [selectedOptions, setSelectedOptions] = useState([]);
    // const [formData, setFormData] = useState({
    //     title: '',
    //     description: '',
    //     phoneNumber: '',
    //     price: '',
    //     willaya: '',
    //     selectedCategory: []
    // });

    const handleSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    }
    const customStyles = {

        control: (provided) => (
            {
                ...provided,
                backgroundColor: 'var(--background-color)',
                color: 'var(--text-color)'
            }
        ),
        option: (provided) => (
            {
                ...provided,
                backgroundColor: 'var(--background-color)',
                color: 'var(--text-color)'

            }
        )
    }

    const [principalImage, setPrincipalImage] = useState(image);
    const [otherImages, setOtherImages] = useState([image, image]);

    const handlePrincipalImageChange = (event) => {
        setPrincipalImage(URL.createObjectURL(event.target.files[0]));
    };

    const handleOtherImageChange = (index, event) => {
        const newOtherImages = [...otherImages];
        newOtherImages[index] = URL.createObjectURL(event.target.files[0]);
        setOtherImages(newOtherImages);
    };

    return (
        <div className='account-center'>

            <div className="user-l">
                <div className="user-l-content">


                    <li>
                        <Link to='/'
                            style={
                                {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%'
                                }
                        }>

                            Home
                            <AiOutlineHome/>
                        </Link>
                    </li>
                    <li>
                        <Link to='/dashboard'
                            style={
                                {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%'
                                }
                        }>

                            Dashboard
                            <AiOutlineDashboard/>
                        </Link>
                    </li>
                    <li>
                        <Link to='/Details'
                            style={
                                {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%'
                                }
                        }>
                            Account details
                            <CiUser/>
                        </Link>
                    </li>
                    <li>Logout
                        <MdOutlineLogout/>
                    </li>
                </div>

                <Ads uri='https://electro.madrasthemes.com/wp-content/uploads/2016/03/ad-banner-sidebar.jpg'/>
            </div>
            <div className="add-content">


                <div className="add-post-l">
                    <div className="add-big-image">
                        <p>Choose The Principal Image</p>
                        <div className="principal-image">
                            <label htmlFor="principal-image-input">
                                {
                                principalImage ? (
                                    <img src={principalImage}
                                        alt="Principal"
                                        style={
                                            {
                                                width: '400px',
                                                border: '2px solid #e81a2a ',
                                                borderRadius: '10px'
                                            }
                                        }/>
                                ) : (
                                    <span>Click to upload image</span>
                                )
                            } </label>
                            <input type="file" id="principal-image-input" accept="image/*"
                                onChange={handlePrincipalImageChange}
                                style={
                                    {display: 'none'}
                                }/>
                        </div>
                    </div>
                    <div className="add-images">
                        <p>Choose Other Images</p>
                        <div className="images-sub">
                            {
                            [0, 1].map((index) => (
                                <div key={index}>
                                    <label htmlFor={
                                        `other-image${index}-input`
                                    }>
                                        {
                                        otherImages[index] ? (
                                            <img src={
                                                    otherImages[index]
                                                }
                                                alt={
                                                    `Other ${index}`
                                                }
                                                style={
                                                    {
                                                        width: '150px',
                                                        cursor: 'pointer',
                                                        border: '2px solid #e81a2a ',
                                                        borderRadius: '10px'
                                                    }
                                                }/>
                                        ) : (
                                            <span>Click to upload image</span>
                                        )
                                    } </label>
                                    <input type="file"
                                        id={
                                            `other-image${index}-input`
                                        }
                                        accept="image/*"
                                        onChange={
                                            (event) => handleOtherImageChange(index, event)
                                        }
                                        style={
                                            {display: 'none'}
                                        }/>
                                </div>
                            ))
                        } </div>
                    </div>
                </div>
                <div className="add-post-r">
                    <div className="add-category">
                        <p>Choose The Category for your post</p>
                        <Select value={selectedOptions}
                            onChange={handleSelectChange}
                            options={category}
                            isMulti={true}
                            placeholder="Select countries"
                            styles={customStyles}/>
                    </div>
                    <div className="add-title">
                        <p>Write a Title for your product</p>
                        <input type="text" name="title" id="" placeholder='write title for your product'/>
                    </div>
                    <div className="add-description">
                        <p>Write Description for your product
                        </p>
                        <textarea name="description" id=""
                            //  value={des}
                            cols="30"
                            rows="10"
                            placeholder='write some lines to describe your product '
                        ></textarea>
                    </div>
                    <div className="add-title">
                        <p>write your phone number</p>
                        <input type="tel" pattern="[0-9]{10}" name="phoneNumber" id="" placeholder='write your phone number'/>
                    </div>

                    <div className="add-price">
                        <p>fix price for your product</p>
                        <input type="number" placeholder='00' name="price" id=""/>
                    </div>
                    <div className="add-price">
                        <p>add your willaya</p>


                        <Select value={selectedOptions}
                            onChange={handleSelectChange}
                            options={options}
                            isMulti={false}
                            placeholder="Select countries"
                            styles={customStyles}/>


                    </div>


                    <button type="submit" class="btn-submit">Submit</button>

                </div>
            </div>

        </div>
    )
}

export default AddPost
