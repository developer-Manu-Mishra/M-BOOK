import React from 'react'
import { useState } from 'react'
import notesContext from './noteContext'

const NotesState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);
        // Fetch All Notes

        const getNotes = async(title, description, tag) => {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token':localStorage.getItem('token')
                },
            });

            const note = await response.json();
    
            // console.log(json)
            setNotes(note)
    
        }

    // Add A Note

    const addNote = async(title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });

        const note= await response.json();
        setNotes(notes.concat(note))
        



    }
    // Delete A Note

    const deleteNote = async(id) => {

        // api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            
        });
            await response.json();

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }
    // Edit A Note

    const editNote = async (id, title, description, tag) => {
        //API CALL

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });

        await response.json();
        

        let newNotes = JSON.parse(JSON.stringify(notes))

        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }

        }
        setNotes(newNotes)
    }


    return (
        <notesContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
            {props.children}
        </notesContext.Provider>
        // <notesContext.Provider value={{ state:state, update:update }}>
        //     {props.children}
        // </notesContext.Provider>
    )
}

export default NotesState;