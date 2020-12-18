import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateLocation } from "../../../redux/actions/locationAction";
import "./CreateForm.css";
import Footer from "../../footer/Footer";
import FileBase from "react-file-base64";
import { MdPhotoSizeSelectActual, MdSubject } from "react-icons/md";

const EditForm = (props) => {
  const { item } = props.history.location.state;
  const [value, setValue] = useState({ location: item.location, image: item.image, description: item.description });
  const history = useHistory();
  const dispatch = useDispatch()
  console.log(item)

  const onChange = (e) => setValue({ ...value, [e.target.id]: e.target.value });
  console.log(value);

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateLocation(item._id, value))
    console.log(item._id)
    history.push('/explore')
    window.location.reload()
  }

    return (
      <React.Fragment>
      <div className="CreateForm">
        <div className="container">
          <h1>Edit Location</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Location Name</label>
              <input
                type="text"
                id="location"
                name="location"
                value={value.location}
                onChange={onChange}
              />
            </div>
            <div className="form group">
              <label htmlFor="image">Image <MdPhotoSizeSelectActual /></label>
              <div className="flex">
                <input
                type="text"
                name="image"
                id="image"
                value={value.image}
                onChange={onChange}
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
            <button className="btn btn-default w-38">Update</button>
          </form>
        </div>
      </div>
        <Footer />
      </React.Fragment>
    );
}

export default EditForm
