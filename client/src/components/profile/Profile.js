import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import "./Profile.css";
import {
  deleteUser,
  getSpecificUser,
  updateUser,
} from "../../redux/actions/authAction";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const user = useSelector((state) => state.auth.specificUser);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState({
    username: currentUser && currentUser.username,
    email: currentUser && currentUser.email,
    password: currentUser && currentUser.password,
    avatar: currentUser && currentUser.avatar,
    bio: currentUser && currentUser.bio,
    gender: currentUser && currentUser.gender,
  });
  const [toggle, setToggle] = useState(false);

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(value));
  };

  useEffect(() => {
    dispatch(getSpecificUser(currentUser && currentUser._id));
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deleteUser());
    history.push("/explore");
  };

  return (
    <React.Fragment>
      <div className="Profile">
        <div className="container">
          {!isLoading && getSpecificUser !== null ? (
            <div>
              <h1>{user ? currentUser.username : " "} Profile</h1>
              <div className="grid-container">
                <img src={user ? currentUser.avatar : " "} alt="" />
                <div className="details">
                  <h2>{user ? currentUser.username : " "}</h2>
                  <h3>{user ? currentUser.email : " "}</h3>
                  <p>
                    Bio: <h4>{user ? currentUser.bio : " "}</h4>
                  </p>
                  <p>
                    Gender: <h4>{user ? currentUser.gender : " "}</h4>
                  </p>
                </div>
              </div>
              <hr />
            </div>
          ) : null}

          <div className="options">
            <h4>Edit Profile</h4>
            <button className="btn edit-btn" onClick={() => setToggle(!toggle)}>
              Edit
            </button>
            <button className="btn delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
          {toggle && (
            <div className="form">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={value.username}
                  name="username"
                  onChange={onChange}
                />
                <input
                  type="email"
                  value={value.email}
                  name="email"
                  onChange={onChange}
                />
                <input
                  type="password"
                  value={value.password}
                  name="password"
                  onChange={onChange}
                />
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setValue({ ...value, avatar: base64 })
                  }
                />
                <div className="gender">
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    id="male"
                    placeholder="Gender"
                    value="Male"
                    name="gender"
                    onChange={onChange}
                  />
                  <label htmlFor="female">Female</label>
                  <input
                    id="female"
                    type="radio"
                    placeholder="Gender"
                    value="Female"
                    name="gender"
                    onChange={onChange}
                  />
                </div>
                <textarea rows="10" name="bio" onChange={onChange}>
                  {value.bio}
                </textarea>
                <button className="btn btn-warning">Update</button>
              </form>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Profile;
