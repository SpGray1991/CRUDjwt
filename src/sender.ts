// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'net'.
const net = require("net"),
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
  fs = require("fs");

let server: any,
  istream = fs.createReadStream("./sender/File.txt");

server = net.createServer((socket: any) => {
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  socket.pipe(process.stdout);
  istream.on("readable", function(this: any) {
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
