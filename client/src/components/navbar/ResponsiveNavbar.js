import React, { useState } from "react";
import { FaAffiliatetheme, FaHamburger, FaIcons } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ResponsiveNavbar.css";

const ResponsiveNavbar = () => {
  const [navToggle, setNavToggle] = useState(false);
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
    <div>
      <nav>
        <div className="logo">
          <h4>Wild Traveller</h4>
        </div>
        <ul className={navToggle ? "nav-links" : "nav-active nav-links"}>
          <li style={{ animation: "navLinkFade 0.5s ease forwards 1s" }}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li style={{ animation: "navLinkFade 0.5s ease forwards 2s" }}>
            <a>Contact us</a>
          </li>
          <li style={{ animation: "navLinkFade 0.5s ease forwards 3s" }}>
            <a>Store</a>
          </li>
        </ul>

        {!token ? (
          <ul className={navToggle ? "nav-link" : "nav-active nav-link"}>
            <li style={{ animation: "navLinkFade 0.5s ease forwards 1s" }}>
              <NavLink to="/signup">SignUp</NavLink>
            </li>
            <li style={{ animation: "navLinkFade 0.5s ease forwards 2s" }}>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            {currentUser && (
              <ul className={navToggle ? "nav-link" : "nav-active nav-link"}>
                <li style={{ animation: "navLinkFade 0.5s ease forwards 1s" }}>
                  {" "}
                  <span>{currentUser.username}</span>
                </li>
                <li style={{ animation: "navLinkFade 0.5s ease forwards 2s" }}>
                  <span>
                    <img
                      src={
                        currentUser.avatar ||
                        "https://img2.pngio.com/default-avatar-port-perry-hospital-foundation-gravatar-png-1600_1600.png"
                      }
                      alt=""
                    />
                  </span>
                </li>
                <li
                  style={{ animation: "navLinkFade 0.5s ease forwards 3s" }}
                  onClick={logout}
                >
                  <span>Log Out</span>
                </li>
              </ul>
            )}
          </ul>
        )}

        <div
          className={navToggle ? "burger" : "toggle burger"}
          onClick={() => setNavToggle(!navToggle)}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
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
      </nav>
    </div>
  );
};

export default ResponsiveNavbar;
