import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./Explore.css";
import video from "../../img/video-1.mp4";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../pagination/Pagination";
import Location from "../location/Location";
import {
  sortLocation,
  sortLocationByDateCreated,
} from "../../redux/actions/locationAction";

const Explore = (props) => {
  const data = useSelector((state) => state.location.location);
  const isLoading = useSelector((state) => state.location.isLoading);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [location, setLocation] = useState([]);
  const [q, setQ] = useState("");
  console.log(location.length)

  //SORTING
  const handleSelectChange = (e) => {
    const value = e.target.value;
    value === "a-z" && dispatch(sortLocation());
    value === "z-a" && location.sort().reverse();
    value === "date-created" && dispatch(sortLocationByDateCreated());
    props.history.push("/explore");
  };
  //Filter function
  const handleFilter = (rows) => {
    return rows.filter((row) => row.location.toLowerCase().indexOf(q) > -1);
  };

  const history = useHistory();

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  //Get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = location.slice(indexOfFirstPost, indexOfLastPost);
  //Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (!token) {
      alert("Unauthenticated, you need to be logged in to view places");
      console.log("no token found");
      history.push("/login");
    }
    setLocation(data);
  }, [location, history, dispatch, data, currentPosts, token]);

  return (
    <div className="Explore">
      <div className="showcase">
        <video src={video} muted loop autoPlay></video>
        <div className="hero">
          <h1>Explore the world of Images</h1>
          <h2>
            Add Your own Location and let people know what they think about it
          </h2>
          <h3>Start by adding your Location</h3>
          <Link className="btn btn-outline-warning" to="/create">
            Add Location
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="drop-down-container">
          <select className=" dropdown" onChange={handleSelectChange}>
            <option value="default">Sort by</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="date-created">Date Created</option>
          </select>
          <h2>Locations</h2>
          <div className=" input">
            <input
              type="text"
              value={q}
              placeholder="Search..."
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
        <hr />
      </div>
      <div className="grid">
        {!isLoading ? (
          <Location item={handleFilter(currentPosts)} />
        ) : (
          <h1>Loading....</h1>
        )}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={location.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Explore;
