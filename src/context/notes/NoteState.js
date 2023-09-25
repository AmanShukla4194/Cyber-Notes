import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000";

  const s1 = {
      name: "Aman",
      grade: "12th B",
  };

  // Use setState to update the state
  const [state, setState] = useState(s1); 

  const update = () => {
      setTimeout(() => {
          // Use setState to update the state
          setState({
              name: "Aman Shukla",
              grade: "12th A",
          });
      }, 1000);
  };

  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all notes
  const getNotes = async () => {
    // Fetch from backend API Call
    // API Call
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  // Add a note

  const addNote = async (title, description, tag) => {
    // Fetch from backend API Call
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag })
      });

      const note = await response.json();
      console.log(note)
      // if (json.success) {
      //   setNotes([...notes, json.note]);
      // }
      // console.log("adding a new note")
      // const note = {
      //   "_id": "650a4bbd7ae31c361ea06a5a",
      //   "user": "65020d0efa14e3eaedee8a10",
      //   "title": title,
      //   "description": description,
      //   "tag": tag,
      //   "date": "2023-09-20T01:32:45.922Z",
      //   "__v": 0
      // };
      setNotes(notes.concat(note))
    }
    catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {

    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes);
  }

  // Delete a note
  const deleteNote = async (id) => {
    // API Call
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        }
      });
      const json = await response.json();
      console.log(json)
      console.log("deleting notw with id" + id)
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)
      // if (json.success) {
      //   const updatedNotes = notes.filter((note) => note._id !== id);
      //   setNotes(updatedNotes);
      // } 
    }
    catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
    // <NoteContext.Provider value={{ state, update }}>
    <NoteContext.Provider value={{ state, update, notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
