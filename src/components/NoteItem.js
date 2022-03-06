
import noteContext from '../context/notes/NoteContext';
import React, { useContext } from 'react';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote} = context;
    const { note,updateNote } = props;
    return (
        <div className="col-md-3 my-2" >
            <div className="card">
                <div className="card-body">
                    <i className="fa-solid fa-trash-can mx-2"  onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-solid fa-pen mx-2 "  onClick = {()=>{updateNote(note)}}></i>
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description.split(" ").splice(0,9).join(" ")}...</p>

                </div>
            </div>
        </div>

    )
};


export default NoteItem;
