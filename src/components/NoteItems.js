import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NoteItems = (props) => {
    const context = useContext(NoteContext);
    // Now deleteNote variable conatins deleteNote function of context
    const { deleteNote } = context;

    const { note, updateNote } = props;
    return (
        <>
            <div className='col md-3 my-3'>
                <div className="card" style={{ height: "160px", width: "400px" }}>
                    {/* <img src="https://steamuserimages-a.akamaihd.net/ugc/1040841469448139154/8810289DAF6662A768DC1218232B697506B42B5E/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"  class="card-img-top" alt="..."/> */}
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text">{note.tag}</p>
                        <i className="fa-solid fa-trash" onClick={() => { deleteNote(note._id); props.showAlert("Note deleted successfully", "success") }} style={{ color: "#e92401" }}></i>
                        <i className="fa-solid fa-pen-to-square mx-4" onClick={() => { updateNote(note) }} style={{ color: "#24c304" }}></i>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NoteItems
