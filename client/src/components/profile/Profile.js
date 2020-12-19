import React, { useState } from "react";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import FileBase from 'react-file-base64'
import "./Profile.css";
import { updateUser } from "../../redux/actions/authAction";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch()
  const [value, setValue] = useState({
      username: currentUser.username,
      email: currentUser.email,
      password: currentUser.password,
      avatar: currentUser.avatar
  })

  const onChange = (e) =>{
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(updateUser(value))
  }

  return (
    <React.Fragment>
      <div className="Profile">
        <div className="container">
          <h1>{currentUser.username} Profile</h1>
          <div className="grid-container">
            <img src={currentUser.avatar} alt="" />
            <div className="details">
              <h2>{currentUser.username}</h2>
              <h3>{currentUser.email}</h3>
            </div>
          </div>
          <hr />
          <div className="options">
            <h4>Edit Profile</h4>
            <button className="btn edit-btn">Edit</button>
            <button className="btn delete-btn">Delete</button>
          </div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <input type="text" value={value.username} name="username" onChange={onChange} />
              <input type="text" value={value.email} name="email" onChange={onChange} />
              <input type="text" value={value.password} name="password" onChange={onChange} />
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setValue({ ...value, avatar: base64 })}
              />
              <button className="btn btn-warning">Update</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Profile;
