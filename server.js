import express from "express";
import {runQuery, addUser} from "./db.js";
import dotenv from 'dotenv';

dotenv.config()

const app = express();

app.use(express.static("public"));

app.get("/api/user", async (req, res) => {
    const results = await runQuery();
    res.send(results);
});

app.get("/api/user/add", async (req, res) => {
    const { username, password } = req.query;
    const results = await addUser(username, password);
    res.send(results);
});

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});