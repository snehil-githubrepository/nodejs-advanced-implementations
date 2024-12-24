const http = require("http");
const os = require("os");
const cluster = require("cluster");

//checking if current process is master process
if (cluster.isMaster) {
  const numCPUs = os.cpus().length; // Get the number of CPU cores
  console.log(`Master process ${process.pid} is running`);
  console.log(`Forking ${numCPUs} workers...\n`);

  // Fork workers equal to the number of CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited`);
    // Optionally fork a new worker if one dies
    console.log(`Forking a new worker...`);
    cluster.fork();
  });
} else {
  // Workers will handle HTTP requests
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Handled by worker ${process.pid}\n`);
    })
    .listen(8000);

  console.log(`Worker ${process.pid} started`);
}
