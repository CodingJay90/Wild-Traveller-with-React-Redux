import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import Explore from "./components/explore/Explore";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import { getLocations } from "./redux/actions/locationAction";
import { useEffect } from "react";
import LocationDetails from "./components/location/LocationDetails";
import EditForm from "./components/forms/locationForm/EditForm";
import CreateForm from "./components/forms/locationForm/CreateForm";
import Register from "./components/forms/auth/Register";
import Login from "./components/forms/auth/Login";
import { loadUser } from "./redux/actions/authAction";
import Contact from "./components/contact/Contact.js";
import Profile from "./components/profile/Profile";
import UserProfile from "./components/profile/UserProfile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getLocations());
  }, [dispatch]);
  return (
    <BrowserRouter>
    <Switch>
      <div className="App">
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/explore" component={Explore} />
        <Route path="/details" component={LocationDetails} />
        <Route path="/create" component={CreateForm} />
        <Route path="/edit" component={EditForm} />
        <Route path="/signup" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/contact" component={Contact} />
        <Route path="/userProfile/:id" exact component={UserProfile} />
        <Route path="/profile" component={Profile} />
      </div>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
