// import './App.css';
// import React, { useEffect, useContext, useState } from 'react';
// import { Routes, Route, Navigate } from "react-router-dom"
// import IndexPage from "./Pages/IndexPage"
// import Layout from './Layout';
// import Tweet from './Pages/Tweet';
// import Profile from './Pages/Profile';
// import AllTweets from './Pages/AllTweets';
// import Login from './Pages/Login';
// import Error from './Pages/Error';
// import Register from './Pages/RegisterUser';
// import { UserContextProvider } from "./UserContext";
// import LandingPage from './Pages/LandingPage';
// import { UserContext } from './UserContext';
// import LeftSide from './components/LeftSide';
// import News from './components/News';
// import Options from './components/Options';
// // import Layout from "./Layout"


// function App() {
//   const { setUserInfo, userInfo, auth, setAuth } = useContext(UserContext);

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//       // credentials: 'include',
//     }).then(response => {
//       response.json().then(userInfo => {
//         setUserInfo(userInfo);
//         setAuth(userInfo)
//         localStorage.setItem("token", userInfo.token)
//         console.log(userInfo)
//         console.log(userInfo.token + "TOken")
//       });
//     });
//   }
//   , []);

//   // const username = userInfo?.token
//   const username = auth.token
//   return (
//     <UserContextProvider>
//       <Routes>
//         <Route path='/login' element={<Login />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/' element={<LandingPage />} />
//         <Route path='/error' element={<Error />} />
//         <Route path='/' element={<LeftSide />} />
//         {
//           username && (
//             <Route path='/home' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
//               <Route index element={<ProtectedRoute><IndexPage id={userInfo.info.id} /></ProtectedRoute>} />
//               <Route path='/home/alltweets' element={<ProtectedRoute><AllTweets id={userInfo.info.id} /></ProtectedRoute>} />
//               <Route path='/home/tweet' element={<ProtectedRoute><Tweet /></ProtectedRoute>} />
//               <Route path='/home/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
//               <Route path='/home/news' element={<ProtectedRoute><News /></ProtectedRoute>} />
//               <Route path='/home/options' element={<ProtectedRoute><Options /></ProtectedRoute>} />
//             </Route>
//           )
//         }
//         {!username && (
//           <Route path='/home/error' element={<Error />} />
//         )}
//       </Routes>
//     </UserContextProvider>)
// }

// export function ProtectedRoute(props) {
//   if (localStorage.getItem("token")) {
//     return props.children
//   } else {
//     return <Navigate to='/login' />
//   }
// }

// export default App;


import './App.css';
import React, { useEffect, useContext } from 'react';
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

function App() {
  const { setUserInfo, setAuth, auth, userInfo } = useContext(UserContext);
  const token = localStorage.getItem("currentUser")
  useEffect(() => {
    ; // Get token from local storage

    if (token) { // Check if token exists
      fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then(response => {
        if (response.ok) {
          response.json().then(userInfo => {
            setUserInfo(userInfo);
            setAuth(userInfo);
            console.log(userInfo);
            console.log(userInfo.token + "Token");
          });
        }
      });
    }
  }, [setUserInfo, setAuth]); // Include setUserInfo and setAuth in the dependency array

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/error' element={<Error />} />
        <Route path='/' element={<LeftSide />} />
        {token && (
          <Route path='/home' element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<ProtectedRoute><IndexPage id={userInfo.info.id} /></ProtectedRoute>} />
            <Route path='/home/alltweets' element={<ProtectedRoute><AllTweets id={userInfo.info.id} /></ProtectedRoute>} />
            <Route path='/home/tweet' element={<ProtectedRoute><Tweet /></ProtectedRoute>} />
            <Route path='/home/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='/home/news' element={<ProtectedRoute><News /></ProtectedRoute>} />
            <Route path='/home/options' element={<ProtectedRoute><Options /></ProtectedRoute>} />
          </Route>
        )}
        {!token && (
          <Route path='/home/error' element={<Error />} />
        )}
      </Routes>
    </UserContextProvider>
  );
}

export function ProtectedRoute(props) {
  if (localStorage.getItem("currentUser")) {
    return props.children;
  } else {
    return <Navigate to='/login' />;
  }
}

export default App;
