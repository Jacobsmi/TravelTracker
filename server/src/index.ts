import express, { json } from "express";
import sqlite3 from "sqlite3";

const app = express();
app.use(express.json());

const db = new sqlite3.Database("./src/database.db");

const PORT = 8080;

app.post("/createuser", (req: express.Request, res: express.Response)=>{
  // Prepare the DB insert statement
  let insertStatement = `INSERT INTO users(name, email, password) VALUES(?, ?, ?)`;
  // Run the insert command with varaibles from post request inserted in
  db.run(insertStatement, [req.body.name, req.body.email, req.body.password], (err: (Error & {errno: number}))=>{
    // Checks if there are any errors with the insert
    if (err != null){
      // Checks for constraint errors and non-unique errrors signalling bad email
      if (err.errno == 19 && err.message.includes("UNIQUE")){
        // Return bad email
        res.send(JSON.stringify({
          "success": false,
          "err": "email_not_unique"
        }));
      }
      // Checks for other constraint errors signalling missing info
      else if (err.errno == 19){
        res.send(JSON.stringify({
          "success": false,
          "err": "information_missing"
        }));
      }
      // Sends catch-all for rest of non-explicity caught errors
      else{
        res.send(JSON.stringify({
          "success": false,
          "err": "unknown_err"
        }));
      }
    }
    // If there are no errors send a success response
    else{
      res.send(JSON.stringify({
        "succeess": true,
      }));
    }
  });
});

app.listen(PORT, ()=>{
  console.log(`\u26A1 Listening at http://localhost:${PORT} \u26A1`);
});