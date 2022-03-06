import React, { useContext } from 'react';

import background from './Main_Home.jpg'
const MainHome = () => {
  
  return <div className='container' style={{ backgroundImage: `url(${background})`,backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',height:'100vh' }}>

    <h1>Welcome to iNoteBook: Notes on cloud </h1>
   
  </div>;
};
export default MainHome;
