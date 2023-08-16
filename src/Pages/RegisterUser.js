import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import swal from "sweetalert"

const RegisterUser = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageURL, setImageURL] = useState('')

  // To navigate to a page 
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    if(username === "" || email === "" || password === "" || imageURL === ""){
      swal("Empty fields", "Fill the required fields", "error")
    }else{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/create/user`, {
        method: 'POST',
        body: JSON.stringify({username, password, email, imageURL }),
        headers: { "Content-Type": "application/json" }
      })
      console.log(response.status)
      console.log(response);
      if (response.status === 200) {
        swal("Registered successfull","Welcome", "success")
        navigate("/login")
      } else {
        swal("register failed","There was an error", "error")
      }
    }
  }

  // Handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0]
    setFileToBase(file)
    console.log(file)
  }

  const setFileToBase = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageURL(reader.result)
    }
  }
 return (
  <div className="main-form">

   <div id='main'>
    <div class="container">
    <form class="form" id="form" onSubmit={handleSubmit}>
           <h2 className="sign-header">Register With Twitter</h2>
      <div class="form-control ">
       <label for="username">Username</label>
       <input type="text" 
       id="username" 
       placeholder="enter Username"
      value={username}
      onChange={ev => setUsername(ev.target.value)}
       />
       <small>Error Message</small>
      </div>

      <div class="form-control">
       <label for="Email">Email</label>
       <input type="text" 
       id="Email" 
       placeholder="enter Email"
      value={email}
       onChange={ev => setEmail(ev.target.value)} />
       <small>Error Message</small>
      </div>

      <div class="form-control">
       <label for="password">Password</label>
       <input type="password" 
       id="password" 
       placeholder="enter password"
       value={password}
        onChange={ev => setPassword(ev.target.value)}
       />
       <small>Error Message</small>
      </div>

      <div class="form-control">
       <label for="file">Profile Picture</label>
       <input type="file"
        onChange={handleImage}
       />
       <small>Error Message</small>
      </div>
      <button className='register-btn' type="submit">Submit</button>
     </form>
    </div>

   </div>
  </div>)
}



export default RegisterUser;