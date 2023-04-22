import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Swal from "sweetalert2";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        "service_omw5sz5",
        "template_c35x2ym",
        formRef.current,
        "_y8movzB8W0BgPqOU"
      );
      formRef.current.reset();
      Swal.fire(
        "Message envoyé !",
        "Votre message a bien été envoyé",
        "success"
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erreur, essayez à nouveau",
      });
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="Contact-page">
        <div className="title_contact">
          <h1>Account Details </h1>
        </div>
        <form ref={formRef} onSubmit={handleSubmit}>
          <label htmlFor="">
            <strong>Nom *</strong>
            <input
              name="Nom"
              value={firstName}
              type="text"
              placeholder="Votre Nom"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            <strong> prénom *</strong>
            <input
              name="prénom"
              value={lastName}
              type="text"
              placeholder="votre prénom"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            <strong>Email *</strong>
            <input
              name="email"
              value={email}
              type="email"
              placeholder="write your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <strong>Message *</strong>
            <textarea
              name="message"
              value={message}
              placeholder="Write your message here"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </label>
          <button type="submit">send message</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
