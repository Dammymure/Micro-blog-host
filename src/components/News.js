import React, { useEffect, useState } from 'react';
import Header from './Header';

const News = () => {
 const [update, setUpdate] = useState([])

 useEffect(() => {
  fetch("https://newsdata.io/api/1/news?apikey=pub_26332976b3b010278ce592e2a857fac8996ca&q=latest").then(res => {
   res.json().then(posts => {
    console.log(posts.results)
    setUpdate(posts.results)
   })
  })
 }, [])

 // const [posts, setPost] = useState([])

 return (
  <>
   <div>
    <div><Header/></div>
    <h2>Trending News</h2>
    {
     update.length && update.map(post => {
      return (<>
       <a href={post.link} target="_blank" className='news-tab'>
        <img src={post.image_url} alt="" className='news-image' />
        <div className='news-container'>
         <p className='trend'>Trending...</p>
         <p className='news'>{post.title}</p>
        </div>
       </a>
      </>
      )
     })
    }
   </div>
  </>
 )
}



export default News;