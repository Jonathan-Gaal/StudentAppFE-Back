// Import express library
const express = require("express");
// Import cors
const cors = require("cors");

//import studentsData

const studentsData = require("./studentsData.json");

//app is an instance of the express package
const app = express();

//set up middleware (cors in this example)
app.use(cors());

//define routes

//healthcheck route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "service is running",
  });
});

app.get("/students", (req, res) => {
  try {
    const { students } = studentsData;
    res.status(200).json({
      status: "success",
      data: students,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
});

app.get("/students/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { students } = studentsData;

    const requestedStudent = students.find((student) => student.id === id);
    if (requestedStudent) {
      return res.status(200).json({
        status: "success",
        data: requestedStudent,
      });
    } else {
      return res.status(404).json({
        status: "failed",
        error: `Could not find studnent with id ${id}.`,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
