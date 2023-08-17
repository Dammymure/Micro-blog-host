import React, { useState, useContext } from 'react';
import swal from "sweetalert"
// import axios from 'axios';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';
// import ParticlesBackground from "../components/ParticlesBackground"

const Login = () => {
  // Create a function for handle submit

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { setUserInfo } = useContext(UserContext)
  const { setAuth } = useContext(UserContext)


  // Create a function for the handle input
  // const handleInputs = (e) => {
  //  const name = e.target.name;
  //  const value = e.target.value;
  //  setUser({ ...user, [name]: value })
  // }

  async function handleSubmit(e) {
    e.preventDefault()

    if (username === "" || password === "") {
      swal("Empty fields", "Fill the required fields", "error")
    } else {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
      })
      console.log(response);
      if (response.ok) {
        console.log(response)
        response.json().then(userInfo => {
          console.log(userInfo)
          if (userInfo.msg === "Invalid credentials"){
            swal("Wrong credentials", "Try Again", "error")
          }else{
            setUserInfo(userInfo)
            setAuth(userInfo)
            localStorage.setItem("currentUser",JSON.stringify(userInfo))
            swal("Successful Login", "success")
            setRedirect(true)
          }
        })
      } else {
        swal("Wrong credentials")
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/home"} />
  }


  return (
    <div className="main-form">
      {/* <ParticlesBackground/> */}
      <div id='main'>
        <div class="container">
          <form class="form" id="form" onSubmit={handleSubmit}>
            <h2 className="sign-header">Login With Twitter</h2>
            <div class="form-control ">
              <label for="username">Username</label>
              <input type="text"
                id="username"
                placeholder="enter Username"
                name='username'
                value={username}
                onChange={ev => setUsername(ev.target.value)}
              />
              <small>Error Message</small>
            </div>

            <div class="form-control">
              <label for="password">Password</label>
              <input type="password"
                id="password"
                placeholder="enter password"
                name='password'
                value={password}
                onChange={ev => setPassword(ev.target.value)}
              />
              <small>Error Message</small>
            </div>
            <button className='register-btn'>
              Submit</button>
          </form>
        </div>

      </div>
    </div>)
}



export default Login;