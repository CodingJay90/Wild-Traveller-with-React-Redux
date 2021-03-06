import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { clearError, loginUser } from "../../../redux/actions/authAction";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../footer/Footer";

const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector(
    (state) => state.auth.errMsg !== "" && state.auth.errMsg
  );
  const success = useSelector((state) => state.auth.success);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(error);

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
  };

  const onChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.email !== "" && value.password !== "" && success === false) {
      dispatch(loginUser(value));
      toastSuccess();
    } else {
      dispatch(loginUser(value));
      setTimeout(() => {
        dispatch(clearError());
      }, 1000);
      console.log("action needed");
    }
  };
  if (!success) {
    toastError();
  }
  if (isAuthenticated !== null) {
    history.push("/");
    window.location.reload()
  }
  return (
    <React.Fragment>
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
        <p>Do not have an account ? <span><Link to="signup">Sign Up</Link></span></p>
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
      <div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Login;
