const express = require("express");
const app = express();
const port = 3000;

//Checking in past 1 min if more than 5 requests are made
//if so we will not let that ip hit for next 1 min

const LIMIT = 5; // Max requests per IP
const DURATION = 60 * 1000; //1 min (in ms)

const RequestHistory = {}; //Making map because if it was array lookup time would've increased

const rateLimitMiddleware = (req, res, next) => {
  const clientIp = req.ip; //best way to get ip in express (could also use req.connection.remoteAddress)
  const currentTime = Date.now();

  //New Ip ? Track it
  if (!RequestHistory[clientIp]) RequestHistory[clientIp] = [];

  const requests = RequestHistory[clientIp];

  //removing old requests as it saves memory
  while (requests.length && requests[0] <= currentTime - DURATION) {
    requests.shift();
  }

  if (requests.length >= LIMIT) {
    return res
      .status(429)
      .json({ message: "Too many requests. Try again later." });
  }

  requests.push(currentTime);
  next();
};

app.use(rateLimitMiddleware);

app.post("/test", (req, res) => {
  res.status(200).json({ message: "request successful" });
});

app.listen(port, () => {
  console.log(`Check with Postman on : http://localhost:${port}/test`);
});
