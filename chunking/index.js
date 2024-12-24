const fs = require("fs");

const CHUNK_SIZE = 16; // 16 bytes, for quick check , mainly it could be of form 1024 * 1024 => 100 kb or more

function processChunk(chunk, chunkId) {
  console.log(chunk.toString());
  console.log(`processing chunk with index ${chunkId} of size ${chunk.length}`);
}

function chunk_file(filePath) {
  let chunkInd = 0;

  const readStream = fs.createReadStream(filePath, {
    highWaterMark: CHUNK_SIZE,
  });

  readStream.on("data", (chunk) => {
    processChunk(chunk, chunkInd);
    chunkInd++;
  });

  readStream.on("end", () => {
    console.log("File reading And chunking ended");
  });
}

const filepath = "./read.txt";
chunk_file(filepath);
