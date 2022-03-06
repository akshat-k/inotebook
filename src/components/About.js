import React, { useContext } from 'react';
import NoteState from '../context/notes/NoteState';
import NoteContext from '../context/notes/NoteContext';
import background from './background.jpg'
const About = () => {
  const a = useContext(NoteContext)
  return <div className='container' style={{ backgroundImage: `url(${background})`,backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',height:'100vh' }}>
    <h1>This is about jdd cdsdb dbf dfdjfd dfdfj dfdjfndjfndfd fdfjd f{a.name}</h1>
  </div>;
};

export default About;
