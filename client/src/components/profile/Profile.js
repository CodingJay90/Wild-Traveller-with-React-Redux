import React, { useState } from "react";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import FileBase from 'react-file-base64'
import "./Profile.css";
import { deleteUser, updateUser } from "../../redux/actions/authAction";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch()
  const history = useHistory()
  const [value, setValue] = useState({
      username: currentUser.username,
      email: currentUser.email,
      password: currentUser.password,
      avatar: currentUser.avatar
  })
  const [toggle, setToggle] = useState(false)

  const onChange = (e) =>{
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(updateUser(value))
  }

  const handleDelete = () => {
    dispatch(deleteUser())
    history.push('/explore')
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
            <button className="btn edit-btn" onClick={() => setToggle(!toggle)}>Edit</button>
            <button className="btn delete-btn" onClick={handleDelete}>Delete</button>
          </div>
          {toggle && <div className="form">
            <form onSubmit={handleSubmit}>
              <input type="text" value={value.username} name="username" onChange={onChange} />
              <input type="email" value={value.email} name="email" onChange={onChange} />
              <input type="password" value={value.password} name="password" onChange={onChange} />
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setValue({ ...value, avatar: base64 })}
              />
              <button className="btn btn-warning">Update</button>
            </form>
          </div>}
          
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Profile;
