import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../../../redux/actions/authAction';
import './Register.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch()
  const history = useHistory()
  const error = useSelector(state => state.auth.errMsg)
  console.log(error.message)

  const toastError = () =>
    toast(error.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "Toastify__toast--error",
    });

  const toastSuccess = () =>
    toast(`Welcome`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "Toastify__toast--success",
    });

  const onChange = (e) => setValue({ ...value, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault()
    if(value.email !== '' && value.password !== '') {
      history.push('/')
      dispatch(loginUser(value))
      toastSuccess()
    }
    else {
      toastError()
      dispatch(loginUser(value))
      console.log('action needed')
    }
  }
  return (
    <div className="Signup">
      <div className="container">
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={onChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
          />
          <button className="btn btn-warning">Login</button>
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
  );
}

export default Login
