import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { formatDistanceToNowStrict } from "date-fns"
import { FaThumbsDown } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import { VscAdd } from "react-icons/vsc";
import { UserContext } from '../UserContext';
import Loader from '../components/Loader';



// const { _id } = useParams
// console.log(_id);

const AllTweets = (id) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const currentID = JSON.parse(localStorage.getItem('currentUser'))
  console.log(currentID);
  // const { setUserInfo, userInfo } = useContext(UserContext);

  const [tweets, setTweets] = useState([])
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tweet/home`).then(response => {
      response.json().then(posts => {
        console.log(posts);
        setLoading(false);
        setTweets(posts);
      })
    })
  }, [])

  const likeTweet = (idendti, currentID) => {

    fetch(`${process.env.REACT_APP_API_URL}/tweet/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentID,
        tweetId: idendti,
      })
    }).then(res => res.json())
      .then(result => {
        // console.log(result);
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err);
      })
  }

  const unlikeTweet = (identi, currentID) => {
    fetch(`${process.env.REACT_APP_API_URL}/tweet/unlike`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentID,
        tweetId: identi,
      })
    }).then(res => res.json())
      .then(result => {
        // console.log(result);
        const newData = data.map(item => {
          if (item._id == result._id) {
            return result
          } else {
            return item
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="tweet-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          {tweets.length > 0 ? (
            tweets.map(tweet => (
              <div className='tweet-layout' key={tweet._id}>
                <div className='image-contain'>
                  <img src={tweet.postedBy.imageURL} className='tweet-img' alt="User" />
                </div>
                <div className='tweet-text-img'>
                  <div style={{ display: "flex" }}>
                    <p className='tweet-username'>{tweet.postedBy.username}</p>
                    <time className='tweet-time'>
                      -{formatDistanceToNowStrict(new Date(tweet.createdAt))}
                    </time>
                  </div>
                  <div>
                    <p className='tweet-tweet'>{tweet.tweet}</p>
                    <img src={`${process.env.PATH}` + tweet.photo} alt="" className='tweet-image' />
                    <div>
                      {tweet.likes.includes(currentID._id) ? (
                        <button onClick={() => { unlikeTweet(tweet._id, currentID._id) }} className='down'>
                          <FaThumbsDown />
                        </button>
                      ) : (
                        <button onClick={() => { likeTweet(tweet._id, currentID._id) }} className='up'>
                          <FaThumbsUp />
                        </button>
                      )}
                      <p>{tweet.likes.length} Likes</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No tweets available.</p>
          )}
        </>
      )}
    </div>
  );
};





export default AllTweets;

