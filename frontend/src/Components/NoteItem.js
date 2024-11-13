import React from "react";
import { useContext } from "react";
import noteContext from "../Context/noteContext";
const NoteItem = (props) => {

  const context = useContext(noteContext);
  const { deletenote } = context;

  const { note,updatenote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash-can mx-2" onClick={()=>deletenote(note._id)}></i>
            <i className="fa-solid fa-pen mx-2" onClick={()=>updatenote(note)}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
