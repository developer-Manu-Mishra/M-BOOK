import React, { useContext } from 'react'
import { useState } from 'react';
import noteContext from '../context/notes/noteContext'

const Addnote = ({showAlert}) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        showAlert("Note Added Successfully !","success")
        
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className='container-new my-3'>
                <h4 className='text-center my-3'>ADD A NOTE</h4>
                <form>
                    <div className="mb-3">
                        <label htmlFor='title' className="form-label">Title</label>
                        <input type="text" className="form-control" name='title' id='title' value={note.title} onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor='description' className="form-label">Description</label>
                        <input type="text" name='description' className="form-control" id="description" value={note.description} onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor='tag' className="form-label" >Tag</label>
                        <input type="text" name='tag' className="form-control" id="tag" value={note.tag} onChange={onchange} minLength={5} required/>
                    </div>
                    <button disabled={note.title < 5 || note.description < 5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>

            </div>
        </div>
    )
}

export default Addnote
