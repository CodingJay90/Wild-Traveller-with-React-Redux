import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearError, registerUser } from '../../../redux/actions/authAction';
import FileBase from 'react-file-base64'
import './Register.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
    const [value, setValue] = useState({
      email: "",
      username: "",
      password: "",
      avatar: ""
    });
    const dispatch = useDispatch()
    const history = useHistory();

    //SELECTORS
    const isAuthenticated =useSelector(state => state.auth.isAuthenticated)
    const error = useSelector(state => state.auth.errMsg)
    const success = useSelector(state => state.auth.success)

    const toastError = () => {
      toast(error.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "Toastify__toast--error",
      });
    };

    const toastSuccess = () => {
      toast(`Sign up succcessfull`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "Toastify__toast--success",
      });
    };

    const onChange = (e) => setValue({ ...value, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
      e.preventDefault()
      if(isAuthenticated === null) {
        dispatch(registerUser(value))
        setTimeout(() => {
          dispatch(clearError())
        }, 1000);
      }
    }
    if(isAuthenticated !== null) {
      history.push("/explore");
      toastSuccess()
    }
    if(!success) toastError()

    //BASE64
    var handleFileSelect = function (evt) {
      var files = evt.target.files;
      var file = files[0];

      if (files && file) {
        var reader = new FileReader();

        reader.onload = function (readerEvt) {
          var binaryString = readerEvt.target.result;
          var encoded = btoa(binaryString)
          console.log(encoded)
          setValue({...value, avatar: encoded})
        };
        reader.readAsBinaryString(file);
      }
    };
    
    return (
        <div className="Signup">
        <div className="container">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Email" name="email" onChange={onChange} />
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username"   name="username" onChange={onChange} />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password"  name="password" onChange={onChange} />
            <label htmlFor="avatar">Avatar (optional)</label>
            <FileBase
              type="file"
              multiple={false}
              onDone={({base64}) => setValue({...value, avatar: base64 })}
            />
            <button className="btn btn-warning">Register</button>
          </form>
        </div>
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
      </div>
    )
}

export default Register
