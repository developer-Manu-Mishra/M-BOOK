import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note,updateNote } = props;
    const handleclick=(e)=>{
        e.preventDefault()
        window.confirm("Do You Want to delete ? Which is"+ note.title)
        deleteNote(note._id)
        props.showAlert("Note Deleted Sucessfully !","success")
        
    }
    return (
        <div className='col-md-3 my-3'>
            <div className="card" style={{height:'150px'}}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title"> {note.title}</h5>
                        <div>
                            <i className="far fa-trash-alt mx-2" onClick={handleclick}></i>
                            <i className='far fa-edit mx-2'onClick={()=>{updateNote(note)}}></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>


        </div >
    )
}

export default NoteItem
