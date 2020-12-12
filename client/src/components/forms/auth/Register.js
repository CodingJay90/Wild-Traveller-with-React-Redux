import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../../../redux/actions/authAction';
import './Register.css'

const Register = () => {
    const [value, setValue] = useState({
      email: "",
      username: "",
      password: "",
      avatar: ""
    });
    const dispatch = useDispatch()
    const history = useHistory();

    const onChange = (e) => setValue({ ...value, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser(value))
        console.log(value)
        history.push("/explore");
    }
    
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
            <input type="text" placeholder="Input avatar url" name="avatar" onChange={onChange} />
            <button className="btn btn-warning">Register</button>
          </form>
        </div>
      </div>
    )
}

export default Register
