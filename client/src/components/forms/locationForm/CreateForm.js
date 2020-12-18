import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addLocation } from "../../../redux/actions/locationAction";
import FileBase from "react-file-base64";
import "./CreateForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../footer/Footer";
import { MdPhotoSizeSelectActual, MdSubject } from "react-icons/md";

const CreateForm = () => {
  const [value, setValue] = useState({
    location: '',
    image: '',
    description: '',
  });
  const history = useHistory();
  const dispatch = useDispatch()
  const error = useSelector(state => state.location !== null && state.location.error)
  console.log(error)

  //Toast Error Messages
  const toastError = () =>
    toast("All fields are required", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "Toastify__toast--error",
    });

  const onChange = (e) => setValue({ ...value, [e.target.id]: e.target.value });
  console.log(value);

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(addLocation(value))
      if(value.location !== '' && value.image !== '' && value.description !== '') {
        history.push('/explore')
        console.log(value)
      }
      else {
        console.log('action needed')
        toastError()
      }
  }

  return (
    <React.Fragment>
    <div className="CreateForm">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        bodyClassName="white"
        progressClassName="Toastify__progress-bar--dark"
      />
      <div className="container">
        <h1>Create Location</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Location Name</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder='Location Name'
              value={value.location}
              onChange={onChange}
            />
          </div>
          <div className="form group">
            <label htmlFor="image">Image {" "} <MdPhotoSizeSelectActual /></label>
            <div className="flex">
              <input
                type="text"
                name="image"
                id="image"
                value={value.image}
                onChange={onChange}
                placeholder='Image Url'
              />
              OR
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setValue({ ...value, image: base64 })}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description <MdSubject /></label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              value={value.description}
              onChange={onChange}
            ></textarea>
          </div>
          <button className="btn btn-default w-38">Submit</button>
        </form>
      </div>
    </div>
    <div>
      <Footer />
    </div>
    </React.Fragment>
  );
};

export default CreateForm;
