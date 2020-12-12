import React from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import "./LocationItem.css";

const LocationItem = ({ item: { location, image, description }, item }) => {
  // console.log(item)
  return (
    <div className="LocationItem">
      <div className="container">
        <div className="item">
          <div className="image">
            <img src={image} alt={image} width="300" />
          </div>
          <div className="detail">
            <h1>{location}</h1>
            <h4>{description.substring(0, 30)}...</h4>
            <Link
              className="btn btn-outline-secondary"
              to={{
                pathname: "/details",
                state: { item },
              }}
            >
              <FaEllipsisV />
              View More
            </Link>
          </div>
        </div>
        <hr className="sep-2" />
      </div>
    </div>
  );
};

export default LocationItem;
