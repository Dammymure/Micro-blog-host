import React from 'react';
import { Link } from 'react-router-dom'
import Star from "../images/Twitter_star.png"
import Options from "../images/options.png"
import News from "../images/news.svg"
import Home from "../images/home.svg"

const Header = () => {
 return (<div>
  <div className="header-container">
   <div className="home-header">
    <span className='opt'><Link to='/home/options'><img className='icon' src={Options} /></Link></span>

    <h2><Link to="/home"><img className='icon' src={Home} /></Link> </h2>
    <img src={Star} alt='' className='star icon' />
    <span className='trending'><Link to='/home/news'><img className='icon' src={News} /></Link></span>
   </div>
  </div>
 </div>);
}

export default Header;