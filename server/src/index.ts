import express, { json } from "express";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

const db = new sqlite3.Database("./src/database.db");

const PORT = 8080;

const SALTROUNDS = 10;
app.post("/createuser", async (req: express.Request, res: express.Response) => {
  // Hash the password so we don't store clear text
  bcrypt.hash(req.body.password, SALTROUNDS, function (err, hash) {
    // Store password in DB
    if (err != null) {
      res.send(JSON.stringify({
        "success": false,
        "err": "hash_pass_err"
      }));
      return;
    }
    else {
      // Prepare the DB insert statement
      let insertStatement = `INSERT INTO users(name, email, password) VALUES(?, ?, ?)`;
      // Run the insert command with varaibles from post request inserted in
      db.run(insertStatement, [req.body.name, req.body.email, hash], (err: (Error & { errno: number })) => {
        // Checks if there are any errors with the insert
        if (err != null) {
          // Checks for constraint errors and non-unique errrors signalling bad email
          if (err.errno == 19 && err.message.includes("UNIQUE")) {
            // Return bad email
            res.send(JSON.stringify({
              "success": false,
              "err": "email_not_unique"
            }));
            return;
          }
          // Checks for other constraint errors signalling missing info
          else if (err.errno == 19) {
            res.send(JSON.stringify({
              "success": false,
              "err": "information_missing"
            }));
            return;
          }
          // Sends catch-all for rest of non-explicity caught errors
          else {
            res.send(JSON.stringify({
              "success": false,
              "err": "unknown_err"
            }));
            return;
          }
        }
        // If there are no errors send a success response
        else {
          res.send(JSON.stringify({
            "succeess": true,
          }));
          return;
        }
      // End of db.run
      });
    // end of bcrypt else
    }
  // end of bcrypt.hash
  });
// end of app.post
});

app.listen(PORT, () => {
  console.log(`\u26A1 Listening at http://localhost:${PORT} \u26A1`);
});