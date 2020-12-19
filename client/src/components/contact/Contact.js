import React from "react";
import "./Contact.css";
import { FaBlogger, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import Footer from "../footer/Footer";

const Contact = () => {
  return (
    <div className="Contact">
      <div className="jumbotron">
        <div className="showcase">
          <h1>Contact</h1>
          <h2>Lorem ipsum dolor sit amet.</h2>
        </div>
      </div>
      <div className="socials">
        <ul>
          <li>
            <FaTwitter /> Twitter
          </li>
          <li>
            <FaFacebook /> Facebook
          </li>
          <li>
            <FaInstagram /> Instagram
          </li>
        </ul>
      </div>
        <h3>Kindly Leave us a message</h3>
      <div className="contact-form">
          <div className="layer">
            <form>
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Name" />
            <textarea placeholder="message" cols="30" rows="10"></textarea>
            <button className="btn w-38 btn-warning">Submit</button>
            </form>

          </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
