
import React, { useContext, useState } from 'react';
import a from '../context/notes/NoteContext';

const AddNote = () => {
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const context = useContext(a);
    const { addNote } = context;
    const handleclick = (e) => {
        e.preventDefault(); // To prevent page reload
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
    }
    const onchange = (e) => {
        console.log("On change function");
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (

        <div>
            <h2>Add a Note</h2>
            <div className="contaner " my-3 >

                <form className='container' my-3>
                    <div className="mb-3" style={{ width: '500px' }}>
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onchange} minLength={5} required />

                    </div>
                    <div className="mb-3" style={{ width: '500px' }}>
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="textarea" className="form-control" id="description" name="description" onChange={onchange} value={note.description} minLength={5} required />
                    </div>
                    <div className="mb-3" style={{ width: '500px' }}>
                        <label htmlFor="description" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} />
                    </div>

                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote