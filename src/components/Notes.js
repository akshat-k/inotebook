
import noteContext from '../context/notes/NoteContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";

const Notes = () => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            console.log("it is available");
            
            getAllNotes()
            console.log("New console"+note.Notes);
        }
        else{
            console.log("In else condition");
            navigate('/login')
        }

    }, [])

    const ref = useRef(null)
    const ref1 = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })


    const updateNote = (currentNote) => {

        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleclick = (e) => {
        //e.preventDefault(); // To prevent page reload
        console.log("katyaya" + note.etitle, note.edescription, note.etag);

        editNote(note.id, note.etitle, note.edescription, note.etag)
        ref1.current.click();
    }

    const onchange = (e) => {
        console.log("On change function");
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='container' my-3>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange} minLength={5} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} />
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={ref1} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleclick} type="button" className="btn btn-primary">Update Note</button>
                            {/* above disabled is called onclick listner  */}
                        </div>
                    </div>
                </div>
            </div>
            <div className=" row my-5">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length === 0 && ' No notes to Display '}
                </div>
               
                {notes.map((note) => {
                        console.log("key is --->"+note._id);                       
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
};

export default Notes;
