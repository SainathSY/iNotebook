import React, { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import noteContext from "../Context/noteContext";
import NoteItem from "./NoteItem";
import AddingNote from "./AddingNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getnotes, editnote, showAlert } = context;

  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getnotes();
    }
    else{
      navigate('/login')
    }

    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
    eid: ""
  });

  const handleClick = (e) => {
    e.preventDefault();
    editnote(note.eid, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Notes updated successfully", "success");

  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({ eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  };

  return (
    <div className="row my-3">
      <AddingNote />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="note_form">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    value={note.etitle}
                    className="form-control"
                    id="etitle"
                    onChange={onChange}
                    name="etitle"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    value={note.edescription}
                    className="form-control"
                    id="edescription"
                    onChange={onChange}
                    name="edescription"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.etag}
                    id="etag"
                    onChange={onChange}
                    name="etag"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3">
        <h1>Your Notes</h1>
      </div>
      {notes && notes.length > 0 ? (
        notes.map((note) => {
          return <NoteItem note={note} updatenote={updatenote} key={note._id} />;
        })
      ) : (
        <p>No notes available</p>
      )}

    </div>
  );
};

export default Notes;
