import { Outlet } from 'react-router-dom';

import React from 'react';

const Body = () => {
  return (
    <div>
        <h2>Body</h2>
        <Outlet/>
    </div>
  )
}

export default Body;