import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItems from './NoteItems';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {

  const navigate = useNavigate();
  const [note, setNote] = useState({id:"", updatedtitle:"",updateddescription:"",updatedtag:"#CyberNotes" })

  const context = useContext(NoteContext);
  // Now notes variable conatins notes of context
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem("token")){
      getNotes() // As now we are using as componentdidmount()
    }
    else {
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])
  
  const uref = useRef(null)
  const refClose = useRef(null)

  const UpdateNote = (currentNote) => {
    uref.current.click();
    setNote({id : currentNote._id, updatedtitle : currentNote.title, updateddescription : currentNote.description, updatedtag : currentNote.tag});
  }
  
  const handleClick = (e) =>{
    console.log("updating the note", note)
    // event.preventDefault();  Used to prevent form page reloading : no need to do that as it is not the part of the form
    editNote(note.id, note.updatedtitle, note.updateddescription, note.updatedtag)
    refClose.current.click();
    props.showAlert("Note updated successfully", "success")
  }

  const OnChange = (event) =>{
      setNote({...note, [event.target.name]:event.target.value})
  }

  return (
    <>
      <AddNotes showAlert={props.showAlert} />
      <button type="button" ref = {uref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Edit Note</button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="updatedtitle" className="col-form-label">Title</label>
                  <input type="text" className="form-control" value={note.updatedtitle} name="updatedtitle" id="updatedtitle" onChange={OnChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="updateddescription" className="col-form-label">Description</label>
                  <input type="text" className="form-control" id="updateddescription" value={note.updateddescription} name="updateddescription" onChange={OnChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="updatedtag" className="col-form-label">Tags</label>
                  <input type="text" className="form-control" id="updatedtag" value={note.updatedtag} name="updatedtag" onChange={OnChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.updatedtitle.length<5 || note.updateddescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-1">
        {notes.length===0 && 'No Notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItems key={note._id} updateNote={UpdateNote} showAlert={props.showAlert} note={note} />;
        })}
      </div>


    </>
  )
}

export default Notes
