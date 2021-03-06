import React, { useEffect, useState } from "react";
import { FaCaretDown, FaEllipsisV, FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import {
  deleteComment,
  deleteLocation,
  getSpecificComment,
  getSpecificLocations,
} from "../../redux/actions/locationAction";
import "./LocationDetails.css";
import CreateCommentForm from "../forms/commentForm/CreateCommentForm";

const LocationDetails = (props) => {
  const { item } = props.location.state;
  const [toggle, setToggle] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);
  const [populateForm, setPopulateForm] = useState(false);
  const [id, setId] = useState(null);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const location = useSelector((state) => state.location.specificLocation);
  console.log(location);
  const history = useHistory();
  const dispatch = useDispatch();

  const onDeleteLocation = (id) => {
    dispatch(deleteLocation(id));
    history.push("/explore");
  };

  useEffect(() => {
    dispatch(getSpecificLocations(item._id));
  }, [dispatch, item._id]);

  return (
    <div className="LocationDetails">
      <div className="container">
        <div className="img-container">
          <img src={item.image} alt="" />
          {currentUser && currentUser._id === item.author.id && (
            <span className="btn-controller">
              <FaCaretDown size={52} onClick={() => setToggle(!toggle)} />{" "}
            </span>
          )}
        
        {currentUser && currentUser._id === item.author.id ? (
          <span className="options">
            {toggle && (
              <span className="button">
                <Link
                  to={{
                    pathname: "/edit",
                    state: { item },
                  }}
                  className={toggle ? "btn btn-default" : "none"}
                >
                  Edit
                </Link>
                <Link
                  className={toggle ? "btn btn-danger" : "none"}
                  onClick={() => onDeleteLocation(item._id)}
                >
                  Delete
                </Link>
              </span>
            )}
          </span>
        ) : null}
        </div>
        <div className="details">
          <h1>Name : {item.location}</h1>
          <h3>Description : {item.description}</h3>
          <h4>Created By : {item.author.username}</h4>
          <p>Created: {moment(item.createdAt).fromNow()}</p>
        </div>
      </div>

      <h2>Comments</h2>
        <hr className="sep-2" />

      {location.comment ? (
        location.comment.map((data) => {
          return (
            <div className="comment-container" key={data._id}>
              <div className="comment">
                <div className="avatar">
                  {data.avatar ? (
                    <img src={data.avatar} alt="" />
                  ) : (
                    <img
                      src="https://img2.pngio.com/default-avatar-port-perry-hospital-foundation-gravatar-png-1600_1600.png"
                      alt=""
                    />
                  )}
                </div>
                <div className="text">
                  <div className="comment-content">
                    <h4>
                      <Link style={{color: 'blue'}} to={{
                        pathname:`/userProfile/${data.author.id}`,
                        state: {data}
                      }}>
                        {data.author.username}{" "}
                      </Link>
                      {currentUser &&
                        currentUser._id === data.author.id &&
                        "(You)"}{" "}
                    </h4>
                    <p>{data.text}</p>
                    <div className="comment-btn">
                      {currentUser &&
                      commentToggle &&
                      currentUser._id === data.author.id ? (
                        <span className="button">
                          <button
                            className={
                              commentToggle ? "comment-btn" : "none"
                            }
                            onClick={() => {
                              setPopulateForm(!populateForm);
                              dispatch(getSpecificComment(item._id, data._id));
                              setId(data._id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className={
                              commentToggle ? "comment-btn" : "none"
                            }
                            onClick={() => {
                              dispatch(deleteComment(item._id, data._id));
                              window.location.reload();
                            }}
                          >
                            Delete
                          </button>
                        </span>
                      ) : null}
                    </div>
                  </div>
                  {
                    /* {compare comment author } */
                    currentUser && currentUser._id === data.author.id ? (
                      <FaEllipsisV
                        className="options-btn"
                        onClick={() => setCommentToggle(!commentToggle)}
                      />
                    ) : null
                  }
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div
          style={{ margin: "4rem auto", textAlign: "center", display: "block" }}
        >
          <h1>Loading Comments....</h1>
          <FaSpinner size={50} className="App-logo-spin App-logo" />
        </div>
      )}
      <CreateCommentForm
        item={item}
        populateForm={populateForm}
        comment_id={id}
      />
    </div>
  );
};

export default LocationDetails;
