"use strict";

//requires and modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jobsHandler = require("./jobs.js");
const {postJobs, getSavedJobs, updateJob, deleteJob} = require("./saved.js");
const mongoose = require("mongoose");
// const Job = require("./models/job.js");


//middleware
const app = express();
app.use(cors());
app.use(express.json());

// ---- MONGODB -------------
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Mongoose is connected");
});

// Set port
const PORT = process.env.PORT || 3002;

//----- ENDPOINTS--------

app.get("/", (req, res) => {
  console.log("The server is up!");
  res.status(200).send("Welcome to the server. Beep Boop Beep.");
});

// --------JOB ENDPOINTS -------

// basic job search
app.get("/jobs", jobsHandler);

// --------USER DATA ENDPOINTS ---------

// CREATE
app.post("/saved", postJobs);

// READ
app.get("/saved/:user_id", getSavedJobs);

// UPDATE
app.put('/saved/:job_id', updateJob);

// DELETE
app.delete("/saved/:job_id", deleteJob);

// Improper URL handling
app.get("*", (request, response) => {
  response.send("Page not found");
});

// Server error handling
app.use((error, req, res, next) => {
  res.status(500).send(error.message + "error");
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
