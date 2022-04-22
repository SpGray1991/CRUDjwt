import net from "net";
import fs from "fs";

let server,
  istream = fs.createReadStream("./sender/File.txt");

server = net.createServer((socket) => {
  socket.pipe(process.stdout);
  istream.on("readable", function () {
    let data;
    while ((data = this.read())) {
      socket.write(data);
    }
  });
  istream.on("end", function () {
    socket.end();
  });
  socket.on("end", () => {
    server.close(() => {
      console.log("\nTransfer is done!");
    });
  });
});

server.listen(8000, "0.0.0.0");
