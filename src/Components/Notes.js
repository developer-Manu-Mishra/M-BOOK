import React, { useRef, useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import Addnote from './Addnote'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Notes = ({showAlert}) => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    // eslint-disable-next-line
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {

            getNotes();
        }
        else {
            navigate('/login')
        }
       
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const ref = useRef(null)
    const refclose = useRef(null)
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
       
    }
    const handleclick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refclose.current.click();
        showAlert("Note Updated Sucessfully !","success")


    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <Addnote  showAlert={showAlert}/>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor='title' className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.etitle} name='etitle' id='etitle' onChange={onchange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='description' className="form-label">Description</label>
                                    <input type="text" name='edescription' value={note.edescription} className="form-control" id="edescription" onChange={onchange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor='tag' className="form-label" >Tag</label>
                                    <input type="text" name='etag' value={note.etag} className="form-control" id="etag" onChange={onchange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle < 5 || note.edescription < 5} type="button" className="btn btn-primary" onClick={handleclick}>Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container my-3'>
                <h4 className='text-center my-2'>Your Notes</h4>
                <h3 className='py-2 text-center'>{notes.length === 0 && "No Notes to Display Here"}</h3>
                <div className="row justify-content-around">
                    {
                        notes.map((note) => {
                            return <NoteItem key={note._id} updateNote={updateNote} showAlert={showAlert} note={note} />;
                        })}
                </div>
            </div>
        </>

    )
}

export default Notes
