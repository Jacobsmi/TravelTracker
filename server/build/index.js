"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sqlite3_1 = __importDefault(require("sqlite3"));
var app = express_1.default();
app.use(express_1.default.json());
var db = new sqlite3_1.default.Database("./src/database.db");
var PORT = 8080;
app.post("/createuser", function (req, res) {
    // Prepare the DB insert statement
    var insertStatement = "INSERT INTO users(name, email, password) VALUES(?, ?, ?)";
    // Run the insert command with varaibles from post request inserted in
    db.run(insertStatement, [req.body.name, req.body.email, req.body.password], function (err) {
        // Checks if there are any errors with the insert
        if (err != null) {
            // Checks for constraint errors and non-unique errrors signalling bad email
            if (err.errno == 19 && err.message.includes("UNIQUE")) {
                // Return bad email
                res.send(JSON.stringify({
                    "success": false,
                    "err": "email_not_unique"
                }));
            }
            // Checks for other constraint errors signalling missing info
            else if (err.errno == 19) {
                res.send(JSON.stringify({
                    "success": false,
                    "err": "information_missing"
                }));
            }
            // Sends catch-all for rest of non-explicity caught errors
            else {
                res.send(JSON.stringify({
                    "success": false,
                    "err": "unknown_err"
                }));
            }
        }
        // If there are no errors send a success response
        else {
            res.send(JSON.stringify({
                "succeess": true,
            }));
        }
    });
});
app.listen(PORT, function () {
    console.log("\u26A1 Listening at http://localhost:" + PORT + " \u26A1");
});
