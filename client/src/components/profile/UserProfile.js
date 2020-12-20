import React, { useEffect } from "react";
import './Profile.css'
import Footer from "../footer/Footer";
import { getSpecificUser } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";

const UserProfile = (props) => {
    const item = props.history.location.state.data || props.location.state.data || props.match.params.id
    const user = useSelector(state => state.auth.specificUser)
    const isLoading = useSelector(state => state.auth.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpecificUser(item.author.id))
        console.log(window.location.href.substr(34))
    }, [dispatch, item.author.id])
  return (
    <React.Fragment>
      <div className="Profile">
        {!isLoading && getSpecificUser !== null ? (
          <div className="container">
            <h1>{user ? user.username : ' '} Profile</h1>
            <div className="grid-container">
              <img src={user ? user.avatar : ' '} alt="" />
              <div className="details">
                <h2>{user ? user.username : ' '}</h2>
                <h3>{user ? user.email : ' '}</h3>
                <h4>Gender: {user ? user.gender : ' '}</h4>
                <h4>Bio: {user ? user.bio : ' '}</h4>
              </div>
            </div>
            <hr />
          </div>
        ) : (
          <FaSpinner size={50} className="App-logo-spin App-logo" />
        )}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
