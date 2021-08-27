import express from "express";
import sqlite3 from "sqlite3";

const app = express();
app.use(express.json());

const db = new sqlite3.Database("./src/database.db");

const PORT = 8080;

app.post("/createuser", (req: express.Request, res: express.Response)=>{
  // Need to try to insert values into the database
});

app.listen(PORT, ()=>{
  console.log(`\u26A1 Listening at http://localhost:${PORT} \u26A1`);
});