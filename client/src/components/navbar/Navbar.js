import React, { useEffect, useState } from "react";
import { FaAddressCard, FaAffiliatetheme, FaGift, FaHome, FaSignOutAlt, FaWallet } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import "./Navbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hamburger from "../../img/hamburger.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
    toastError();
    setTimeout(() => {
      history.push("/");
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="Navbar">
      <nav className="navbar">
        <ul className="nav-group">
          <li className="nav-item brand">
            <NavLink className="brand" to="/">
              <FaAffiliatetheme size={40} />
              Wild Travelller
            </NavLink>
            <img
              onClick={() => setMenuOpen(!menuOpen)}
              src={hamburger}
              width="40"
              alt=""
              className="menu-icon"
            />
          </li>
        </ul>
        <ul className={!menuOpen ? "nav-group" : "d-none"}>
          <li className="nav-item">
            <FaHome />{' '}<NavLink to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <FaAddressCard />{' '}<NavLink to="/contact">Contact</NavLink>
          </li>
          <li className="nav-item"><FaGift />{' '}Promotion</li>
        </ul>
        {!token ? (
          <ul className={!menuOpen ? "nav-group" : "d-none"}>
            <li className="nav-item">
              <NavLink to="/signup">SignUp</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        ) : (
          <ul className={!menuOpen ? "nav-group" : "d-none"}>
            {currentUser && (
              <ul className={!menuOpen ? "nav-group" : "d-none"}>
                <li className="nav-item">{currentUser.username}</li>
                <li className="nav-item">
                  <img
                    src={
                      currentUser.avatar ||
                      "https://img2.pngio.com/default-avatar-port-perry-hospital-foundation-gravatar-png-1600_1600.png"
                    }
                    alt=""
                  />
                </li>
                <li className="nav-item" onClick={logout}>
                  Log Out{" "}<FaSignOutAlt />
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
