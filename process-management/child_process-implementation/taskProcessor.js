process.on("message", (msg) => {
  if (msg.task === "processImage") {
    const { imageData } = msg;
    console.log(`Processing image data: ${imageData}`);

    // Simulate a time-consuming task (image processing)
    setTimeout(() => {
      const result = `Processed image data: ${imageData}`;

      // Send the result back to the parent process
      process.send(result);
      process.exit(); // Exit the child process when the task is done
    }, 3000); // Simulating a 3-second task
  }
});
