const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

//Route 1: Fetching all notes of a user using GET request hit at "/api/note/fetchallnotes". Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route 2: Add a note of a user using POST request hit at "/api/note/addnote". Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid titile").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If errors are encountered return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = await Note.create({
        title,
        description,
        tag,
        user: req.user.id,
      });

      res.json(note);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  }
);

//Route 3: Update a note of a user using PUT request hit at "/api/note/updatenote". Login required
router.put(
  "/updatenote/:id",
  fetchUser,
  [
    body("title", "Enter a valid titile").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If errors are encountered return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newnote = {};
      if (title) {
        newnote.title = title;
      }
      if (description) {
        newnote.description = description;
      }
      if (tag) {
        newnote.tag = tag;
      }

      //Find note to be updated and update it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ message: "Not Found" });
      }

      if (note.user.toString() != req.user.id) {
        return res.status(404).json({ message: "Not allowed" });
      }

      note=await Note.findByIdAndUpdate(req.params.id,newnote);
      res.json(note);

    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  }
);

//Route 4: Delete an exsiting note of a user using DELETE request hit at "/api/note/deletenote". Login required
router.delete(
  "/deletenote/:id",
  fetchUser,
  async (req, res) => {
    try {
      
      //Find note to be deleted and delete it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ message: "Not Found" });
      }

      if (note.user.toString() != req.user.id) {
        return res.status(404).json({ message: "Not allowed" });
      }

      note=await Note.findByIdAndDelete(req.params.id);
      res.json({success:"successfully deleted",note:note});

    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  }
);

module.exports = router;
