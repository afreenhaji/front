import React from 'react';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <Nav />
      <div className='w-full min-h-[100vh] bg-[#f0efe7] flex flex-col items-center'>
        <Outlet /> 
      </div>
    </div>
  );
}

export default Layout;
