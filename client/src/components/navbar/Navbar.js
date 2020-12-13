import React from "react";
import { FaAffiliatetheme } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./Navbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log(currentUser);
  const history = useHistory();
  //Toast message
  const toastError = () =>
    toast(`Logging you out ${currentUser.username}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "Toastify__toast--success",
    });

  const logout = () => {
    localStorage.removeItem("token");
    toastError()
    setTimeout(() => {
      history.push("/");
      window.location.reload()
    }, 1500);
  };

  return (
    <div className="Navbar">
      <nav className="navbar">
        <ul className="nav-group">
          <li className="nav-item brand">
            <FaAffiliatetheme size={40} />
            <NavLink className="brand" to="/">
              Wild Travelller
            </NavLink>
          </li>
        </ul>
        <ul className="nav-group">
          <li className="nav-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-item">Contact Us</li>
          <li className="nav-item">Promotion</li>
        </ul>
        {!token ? (
          <ul className="nav-group">
            <li className="nav-item">
              <NavLink to="/signup">SignUp</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        ) : (
          <ul className="nav-group">
            {currentUser && (
              <ul className="nav-group">
                <li className="nav-item">{currentUser.username}</li>
                <li className="nav-item">
                  <img src={currentUser.avatar} alt="" />
                </li>
                <li className="nav-item" onClick={logout}>
                  Log Out
                </li>
              </ul>
            )}
          </ul>
        )}
        
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
      </nav>
    </div>
  );
};

export default Navbar;
