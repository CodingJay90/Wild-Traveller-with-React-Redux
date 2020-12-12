import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../../../redux/actions/authAction';
import './Register.css'

const Login = () => {
    const [value, setValue] = useState({
      email: "",
      password: "",
    });
    const dispatch = useDispatch()
    const history = useHistory()

    const onChange = (e) => setValue({ ...value, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(value))
        history.push('/')
    }
    return (
        <div className="Signup">
        <div className="container">
          <h1>Log in</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="Email"  name="email" onChange={onChange} />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password"  name="password" onChange={onChange} />
            <button className="btn btn-warning">Login</button>
          </form>
        </div>
      </div>
    )
}

export default Login
