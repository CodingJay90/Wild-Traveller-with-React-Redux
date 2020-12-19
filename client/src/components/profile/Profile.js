import React from 'react'
import Footer from '../footer/Footer'
import {useSelector} from 'react-redux'
import './Profile.css'
import { Link } from 'react-router-dom'

const Profile = () => {
    const currentUser = useSelector(state => state.auth.currentUser)
    
    return (
        <React.Fragment>
            <div className="Profile">
                <div className="container">
                    <h1>{currentUser.username} Profile</h1>
                    <div className="grid-container">
                        <img src={currentUser.avatar} alt=""/>
                        <div className="details">
                            <h2>{currentUser.username}</h2>
                            <h3>{currentUser.email}</h3>
                        </div>
                    </div>
                    <hr/>
                    <div className="options">
                        <h4>Edit Profile</h4>
                        <button className="btn edit-btn">Edit</button>
                        <button className="btn delete-btn">Delete</button>
                    </div>
                </div>
        <Footer />
            </div>
        </React.Fragment>
    )
}

export default Profile
