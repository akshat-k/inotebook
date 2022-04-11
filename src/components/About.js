import React from 'react';
//import NoteState from '../context/notes/NoteState';
//import NoteContext from '../context/notes/NoteContext';
import background from './background.jpg'
const About = () => {
 // const a = useContext(NoteContext)
  return <div className='container' style={{ backgroundImage: `url(${background})`,backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',height:'100vh' }}>
    <p>This is a basic application to take some very short sticky Notes</p>
    <br></br>
    <br></br>
    Sticky Notes and Reminders app is free Simple and safe Application download and it is a revolutionary note taking software for mobile phones. It is a great app for creating customizable sticky notes that allows you to create sticky notes and reminders on your screen in various customizable colors and stylish cool fonts styles. You can add text, resize and choose fonts styles. You can even change traditional notice board pins to cute and awesome objects to stick on the corner of your stick note chits.
    <br></br>
    <br></br>
    This free android app is the ultimate application to create sticky notes and reminders on your cell phone or Tab device and with the new reminder feature you will never forget a task. Searching through your sticky notes is quick and easy faster than ever as all the notes are visible like real world stick notes.
    <br></br>
    <br></br>
    This simple and awesome notepad app gives you a quick and simple notepad editing experience when you write notes memos e-mails and other such notes. It is simple to share information or text from notes to any social media website or messenger such as whatsapp facebook email twitter linkedin gmail snapchat etc.
    <br></br>
    <br></br>
    No matter what you do, this Sticky notes application is one of the most essential apps for any smartphone user.
  </div>;
};

export default About;
