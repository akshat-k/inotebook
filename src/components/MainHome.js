import React from 'react';

import background from './Main_Home.jpg'
const MainHome = () => {

  return <div style={{textAlign:'center' ,fontFamily:'fantasy'}}>
    <h1 >Welcome to iNoteBook: Notes on cloud </h1>

    <div className='container' style={{
      backgroundImage: `url(${background})`, backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat', width: '800px', height: '500px', marginTop: '25px'
    }}>
    </div>;

  </div>
};
export default MainHome;
