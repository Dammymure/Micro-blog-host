import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';

const Layout = () => {
 return (
  <main>
   <div className='layout'>
    <div className='left-container'>
    <LeftSide/>
    </div>
    <Outlet className="middle"/>
    <RightSide/>
   </div>
  </main>
 )
}


export default Layout;

// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import LeftSide from './components/LeftSide';
// import RightSide from './components/RightSide';

// const Layout = () => {
//  const [isLeftSideOpen, setLeftSideOpen] = useState(true);
//  const [isRightSideOpen, setRightSideOpen] = useState(true);

//  const toggleLeftSide = () => {
//   setLeftSideOpen(!isLeftSideOpen);
//  };

//  const toggleRightSide = () => {
//   setRightSideOpen(!isRightSideOpen);
//  };

//  return (
//   <main>
//    <div className={`layout ${isLeftSideOpen ? '' : 'left-side-closed'} ${isRightSideOpen ? '' : 'right-side-closed'}`}>
//     <button className="toggle-button left-toggle" onClick={toggleLeftSide}>
//      Toggle Left Side
//     </button>
//     <button className="toggle-button right-toggle" onClick={toggleRightSide}>
//      Toggle Right Side
//     </button>
//     {isLeftSideOpen && <LeftSide />}
//     <Outlet />
//     {isRightSideOpen && <RightSide />}
//    </div>
//   </main>
//  );
// };

// export default Layout;