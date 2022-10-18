const router = require("express").Router();
const db = require("../db/notes.json");
const {
  readAndAppend,
  readFromFile,
  writeToFile,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET Route for retrieving all the feedback
router.get("/", (req, res) =>
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
router.post("/", (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if ((title, text)) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, "./db/notes.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting feedback");
  }
});

router.delete(`/:note_id`, function (req, res) {
  const id = req.params.note_id;
  db.splice(id, 1);
  if (id === -1) return res.status(404).json({});

  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

module.exports = router;
