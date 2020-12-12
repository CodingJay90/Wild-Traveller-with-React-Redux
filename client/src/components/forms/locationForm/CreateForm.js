import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addLocation } from "../../../redux/actions/locationAction";
import "./CreateForm.css";

const CreateForm = () => {
  const [value, setValue] = useState({
    location: '',
    image: '',
    description: '',
  });
  const history = useHistory();
  const dispatch = useDispatch()

  const onChange = (e) => setValue({ ...value, [e.target.id]: e.target.value });
  console.log(value);

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(addLocation(value))
      console.log(value)
      history.push('/explore')
  }

  return (
    <div className="CreateForm">
      <div className="container">
        <h1>Create Location</h1>
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
            <label htmlFor="image">Image</label>
            <input
              type="text"
              name="image"
              id="image"
              value={value.image}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
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
  );
};

export default CreateForm;
