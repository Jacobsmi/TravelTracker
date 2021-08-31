// Importing SQLite3 to our project.
import sqlite3 from "sqlite3";
// Setting up a database for storing data.
let db = new sqlite3.Database("./src/database.db");

const sqlStatement = `CREATE TABLE IF NOT EXISTS users(
  rowid,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)`;

db.run(sqlStatement, (err)=>{
  if (err != null){
    console.log("Error creating tables");
    console.log(err);
  }
});