import './App.css';
import React, { useEffect, useContext, useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import IndexPage from "./Pages/IndexPage"
import Layout from './Layout';
import Tweet from './Pages/Tweet';
import Profile from './Pages/Profile';
import AllTweets from './Pages/AllTweets';
import Login from './Pages/Login';
import Error from './Pages/Error';
import Register from './Pages/RegisterUser';
import { UserContextProvider } from "./UserContext";
import LandingPage from './Pages/LandingPage';
import { UserContext } from './UserContext';
import LeftSide from './components/LeftSide';
import News from './components/News';
import Options from './components/Options';
// import Layout from "./Layout"


function App() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  console.log(userInfo);
  // const [auth, setAuth] = useState()

  // useEffect(() => {
  //   if (userInfo.token) {
  //     fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //     }).then(response => {
  //       if (response.ok) {
  //         response.json().then(userInfo => {
  //           setUserInfo(userInfo);
  //           localStorage.setItem("token", userInfo.token);
  //           console.log(userInfo);
  //           console.log(userInfo.token + "Token");
  //         });
  //       }
  //     });
  //   }
  // }, [userInfo, setUserInfo]); 


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
      // method: 'GET',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      credentials: 'include',
      // credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo?.info);
        // setAuth(userInfo)
        localStorage.setItem("token", userInfo.token)
        console.log(userInfo?.info)
        console.log(userInfo.token + "TOken")
      });
    });
  }
  , []);

  // const username = userInfo?.token
  const username = userInfo.token
  const allow = localStorage.getItem("currentUser")
  const parsedData = JSON.parse(allow);
  // console.log(allow);
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/error' element={<Error />} />
        <Route path='/' element={<LeftSide />} />
        {
          allow && (
            <Route path='/home' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<ProtectedRoute><IndexPage id={parsedData._id} /></ProtectedRoute>} />
              <Route path='/home/alltweets' element={<ProtectedRoute><AllTweets id={parsedData._id} /></ProtectedRoute>} />
              <Route path='/home/tweet' element={<ProtectedRoute><Tweet /></ProtectedRoute>} />
              <Route path='/home/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path='/home/news' element={<ProtectedRoute><News /></ProtectedRoute>} />
              <Route path='/home/options' element={<ProtectedRoute><Options /></ProtectedRoute>} />
            </Route>
          )
        }
        {!allow && (
          <Route path='/home/error' element={<Error />} />
        )}
      </Routes>
    </UserContextProvider>)
}

export function ProtectedRoute(props) {
  if (localStorage.getItem("currentUser")) {
    return props.children
  } else {
    return <Navigate to='/login' />
  }
}

export default App;
