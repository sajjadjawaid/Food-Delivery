import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";

//app config
const app = express(); //initialise app with express package
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDb();

app.get("/", (req, res) => {
  res.send("API is working");
});

//run express server
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
