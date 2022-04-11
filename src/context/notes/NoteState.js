import { useState } from "react";
//import { NavigationType } from "react-router-dom";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
  const localhost = "http://localhost:5000"

  const notesintitals = []
  const [notes, setNotes] = useState(notesintitals);
  //notes and setNotes are the objects and whenever these are passed then it will always passed in two brackets
  //if it is a variable then single bracket will suffice.

  //Get All Notes

  const getAllNotes = async () => {
    const response = await fetch(`${localhost}/api/notes/fetchallnotes`, {

      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });

    const json = await response.json();
    setNotes(json);
  }


  //Add a note
  //API CALL
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${localhost}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header

    });

    const note = await response.json();
    setNotes(notes.concat(note));
  }

  //Delete a Note

  const deleteNote = async (id) => {
    const response = await fetch(`${localhost}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });

    const json = response.json();
   
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)

  }


  //Edit a Note 
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${localhost}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects

    let newNote = JSON.parse(JSON.stringify(notes))

    // logic to edit in client
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }

    }
    setNotes(newNote);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;