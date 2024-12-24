//Imagine you're building a task processing service that handles different types of tasks, like:

// Data Processing
// Image Manipulation
// File Compression
// Heavy Calculations

//main process
const express = require("express");
const { fork } = require("child_process");

const app = express();
const port = 3000;

app.get("/processImage", (req, res) => {
  // Delegate the task to a child process
  const child = fork("./taskProcessor.js");

  // Simulate a task (for example, image processing)
  child.send({ task: "processImage", imageData: "image_data" });

  // Once child process processes the result we can kill the child process and send success status
  child.on("message", (result) => {
    res.status(200).send(`Task completed: ${result}`);
    child.kill();
  });

  child.on("exit", () => {
    console.log("Child process has exited");
  });
});

app.listen(port, () => {
  console.log(`(GET) Postman Try on : http://localhost:${port}/processImage`);
});
