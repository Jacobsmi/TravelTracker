"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing SQLite3 to our project.
var sqlite3_1 = __importDefault(require("sqlite3"));
// Setting up a database for storing data.
var db = new sqlite3_1.default.Database("./src/database.db");
