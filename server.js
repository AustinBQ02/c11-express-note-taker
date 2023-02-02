// Dependencies
const express = require("express");
const path = require("path");
const fs = require('fs');
const notes = require("./db/db.json");
const uuid = require("./helpers/uuid");


const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));



// GET Route for ALL notes
app.get("/api/notes", (req, res) => res.json(notes));


// POST request to add a new note
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting review');
    }
  });

// HTML Routes

// GET Route for homepage
app.get("/", (req, res) =>
res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for notes page
app.get("/notes", (req, res) =>
res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET Route for wildcard
app.get("*", (req, res) =>
res.sendFile(path.join(__dirname, "/public/index.html"))
);


// Start the server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
