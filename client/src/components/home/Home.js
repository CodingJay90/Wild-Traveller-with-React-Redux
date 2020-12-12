import React from 'react'
import { FaEnvira } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Home.css";
import image from "../../img/img7.jpg";

const Home = () => {
    return (
      <div className="Home">
        <div className="jumbotron">
          <div className="showcase">
            <h1>Wild Traveler.</h1>
            <h2>Explore the world at the convineince of your bedroom</h2>
          </div>
        </div>
        <div className="section">
          <div className="item-group explore">
            <h2>Want to explore?</h2>
            <h4>Click the button bellow to get started</h4>
            <NavLink className="btn btn-outline-secondary w-100" to="/explore">
              <FaEnvira />
              Get Started
            </NavLink>
          </div>
          <div className="item-group">
            <h2>Your only Explore feeline app</h2>
            <h5>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              officiis, modi libero aliquam impedit corrupti?
            </h5>
            <img src={image} alt="" width="600" height="300" />
          </div>
        </div>
      </div>
    );
}

export default Home
