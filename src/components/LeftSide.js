import React, { useContext } from 'react';
import Twitter from "../images/twitter_1384065.png"
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const LeftSide = () => {
 const { setUserInfo, userInfo } = useContext(UserContext);
 const navigate = useNavigate()

 function logout() {
  fetch(`${process.env.REACT_APP_API_URL}/user/logout`, {
   credentials: "include",
   method: "POST",
  })
  setUserInfo(null)
  localStorage.removeItem("currentUser")
  localStorage.removeItem("token"); 
  
  console.log(userInfo)
  if (userInfo == null) {
   navigate("/home")
  }
 }
 return (<div className='left'>
  <div className='logo-container'>
   <img src={Twitter} alt='' className='twitter-logo' />
  </div>
  <div className='options'>
   <ul>
    <Link className='link menu-item' to='/home'>
     <img src='' alt='' />
     <h2>Home</h2>
    </Link>
    <Link className=' link menu-item'>
     <img src='' alt='' />
     <h2>Explore</h2>
    </Link>
    <Link className='link menu-item'>
     <img src='' alt='' />
     <h2>Notification</h2>
    </Link>
    <Link className='link menu-item'>
     <img src='' alt='' />
     <h2>Message</h2>
    </Link>
    <Link className='link menu-item'>
     <img src='' alt='' />
     <h2>Bookmarks</h2>
    </Link>
    <Link className='link menu-item'>
     <img src='' alt='' />
     <h2>Lists</h2>
    </Link>
    <Link className='link menu-item' to='/profile'>
     <img src='' alt='' />
     <h2>Profile</h2>
    </Link>
    <Link className='link menu-item'>
     <img src='' alt='' />
     <h2>More</h2>
    </Link>
    <Link className='link menu-item' to='/tweet'>
     <img src='' alt='' />
     <h2>Tweet</h2>
    </Link>
    <Link className='link menu-item logout' to='/login'>
     <img src='' alt='' />
     <h2>
      <a onClick={logout} href="">Logout</a>
     </h2>
    </Link>

   </ul>
  </div>

 </div>);
}


export default LeftSide;