const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {

    // GET Request
    app.get("/api/notes", (req, res) => {
        fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
        });
    });
}
