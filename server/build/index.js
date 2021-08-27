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
    // Need to try to insert values into the database
});
app.listen(PORT, function () {
    console.log("\u26A1 Listening at http://localhost:" + PORT + " \u26A1");
});
