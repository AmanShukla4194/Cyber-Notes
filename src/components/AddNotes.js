import React from 'react'
import { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext'

const AddNotes = (props) => {

    const context = useContext(NoteContext);
    // Now addnote variable conatins addNote function of context
    const { addNote } = context;

    const [note, setNote] = useState({title:"",description:"",tag:"#CyberNotes"})

    const handleClick = (event) =>{
        event.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note added successfully", "success")
    }

    const OnChange = (event) =>{
        setNote({...note, [event.target.name]:event.target.value})
    }

    return (
        <>
            <div className="container my-3">
                <h1>Add a Note</h1>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" onChange={OnChange} id="title" name="title" minLength={5} required value={note.title} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" onChange={OnChange} name="description" id="description" value={note.description} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tags</label>
                        <input type="text" className="form-control" onChange={OnChange} name="tag" id="tag" value={note.tag} />
                    </div>
                    {/* <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" onChange={OnChange} id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Are you sure yo want to add this note</label>
                    </div> */}
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>

        </>
    )
}

export default AddNotes
