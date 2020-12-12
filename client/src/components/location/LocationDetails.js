import React, { useEffect, useState } from "react";
import { FaCaretDown, FaEllipsisV } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { deleteComment, deleteLocation, getSpecificComment, getSpecificLocations } from "../../redux/actions/locationAction";
import "./LocationDetails.css";
import CreateCommentForm from "../forms/commentForm/CreateCommentForm";

const LocationDetails = (props) => {
  const { item } = props.location.state;
  const [toggle, setToggle] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false)
  const [populateForm, setPopulateForm] = useState(false)
  const [id, setId] = useState(null)
  const currentUser = useSelector((state) => state.auth.currentUser);
  const location = useSelector((state) => state.location.specificLocation)
  console.log(location)
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(item);

  const onDeleteLocation = (id) => {
    dispatch(deleteLocation(id));
    history.push("/explore");
  };

  useEffect(() => {
    dispatch(getSpecificLocations(item._id))
  }, [])

  return (
    <div className="LocationDetails">
      <div className="container">
        <div className="image">
          <div className="img-container">
            <img src={item.image} alt="" />
            {currentUser && currentUser._id === item.author.id && (
              <span className="btn-controller">
                <FaCaretDown size={52} onClick={() => setToggle(!toggle)} />{" "}
              </span>
            )}
          </div>
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
        <hr className="sep-2" />
      </div>

      {location.comment
        ? location.comment.map((data) => {
          console.log(data)
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
                    <h4>{data.author.username}</h4>
                    <p>{data.text}</p>
                    <FaEllipsisV
                      onClick={() => setCommentToggle(!commentToggle)}
                    />
                    <hr />
                  </div>
                  {commentToggle && (
                    <span className="button">
                      <button
                        className={commentToggle ? "comment-btn btn-default" : "none"}
                        onClick={() => {
                          setPopulateForm(!populateForm)
                          dispatch(getSpecificComment(item._id, data._id))
                          setId(data._id)
                          }}
                      >
                        Edit
                      </button>
                      <button
                        className={commentToggle ? "comment-btn btn-danger" : "none"}
                        onClick={() => dispatch(deleteComment(item._id, data._id))}
                      >
                        Delete
                      </button>
                    </span>
                  )}
                </div>
              </div>
            );
          })
        : null}
      <CreateCommentForm item={item} populateForm={populateForm} comment_id={id} />
    </div>
  );
};

export default LocationDetails;
