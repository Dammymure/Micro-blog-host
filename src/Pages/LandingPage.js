import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
 return (
 <div className='hero-page'>
  <div className='hero'>
   <h1>
    Don’t miss what’s happening</h1>
   <p>People on Twitter are the first to know.</p>
  </div>
  <div className='sign-btn'>
    <button><Link to="/register">Sign up</Link></button>
    <button><Link to="/login">Sign in</Link></button>
  </div>
 </div>)
}



export default LandingPage;