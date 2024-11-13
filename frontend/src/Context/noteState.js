import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const initialnotes = [];  
  // const host = process.env.REACT_APP_SERVER_URL; //for using locally

  const host="https://i-notebook-backend-xi.vercel.app"
  console.log(host);

  const [alert, setAlert] = useState({message:"",type:""});

  const showAlert=(message,type)=>{
    setAlert({
      message:message,
      type:type
    })

    setTimeout(()=>{setAlert(null);},1500);
  }
  
  const [notes, setNotes] = useState(initialnotes);


  //Fetch all Notes
  const getnotes = async() => {
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token"), },
      });
      const json=await response.json();

      setNotes(json);

  };

  //Edit a note
  const editnote = async(id, title, description, tag) => {
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
           localStorage.getItem("token"),   },
        
      body: JSON.stringify({ title, description, tag }),
      });
      const json=await response.json();
      console.log(json);

      const newNotes=JSON.parse(JSON.stringify(notes));

      //logic to edit in client
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
        }
        break;
        
      }
      setNotes(newNotes);

  };

  //Add Note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem("token"), },
      body: JSON.stringify({ title, description, tag }),
    });

    const json=await response.json();

    const note=json;

    setNotes(notes.concat(note));
  };

  //Delete Note
  const deletenote = async (id) => {

    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem("token"), },
      
    });
    
    console.log("Deleting note ");
    const json=await response.json();
    console.log(json);
    
    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );

    showAlert("Notes deleted successfully", "success"); 
  };


  return (
    <NoteContext.Provider value={{ alert,showAlert,notes, addnote, deletenote, editnote, getnotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState; // N should be in uppercase otherwise react confuses it as custom hook.
