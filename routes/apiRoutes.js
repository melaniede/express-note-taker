const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {

    // Get route for retrieving note
    app.get("/api/notes", (req, res) => {
        fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    });

    // Post route for new note
    app.post("/api/notes", (req, res) => {
        let newNote = req.body;
        newNote.id = uuidv4();
        fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;
            let note = JSON.parse(data);
            note.push(newNote);
            fs.writeFile("./db/db.json", JSON.stringify(note), (err) => {
                if (err) throw err;
                res.json(note);
            });
        });
    });

    // Delete route for deleting notes
    app.delete("/api/notes/:id", (req, res) => {
        let id = req.params.id;
        fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;
            let note = JSON.parse(data);
            let noteArr = note.filter((notes) => {
                return id !== notes.id;
            })
            fs.writeFile("./db/db.json", JSON.stringify(noteArr), (err) => {
                if (err) throw err;
                res.json(noteArr);
            });
        });
    });
}