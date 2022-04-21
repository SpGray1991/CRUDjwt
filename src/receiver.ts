// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'net'.
const net = require("net"),
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
  fs = require("fs"),
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  remote_server = process.argv[2];
let socket: any;

socket = remote_server ? net.connect(8000, remote_server) : net.connect(8000);

let ostream = fs.createWriteStream("./receiver/File.txt");
let date = new Date(),
  size = 0,
  elapsed: any;
socket.on("data", (chunk: any) => {
  size += chunk.length;
  // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
  elapsed = new Date() - date;
  socket.write(
    `\r${(size / (1024 * 1024)).toFixed(
      2
    )} MB of data was sent. Total elapsed time is ${elapsed / 1000} s`
  );
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  process.stdout.write(
    `\r${(size / (1024 * 1024)).toFixed(
      2
    )} MB of data was sent. Total elapsed time is ${elapsed / 1000} s`
  );
  ostream.write(chunk);
});
socket.on("end", () => {
  console.log(
    `\nFinished getting file. speed was: ${(
      size /
      (1024 * 1024) /
      (elapsed / 1000)
    ).toFixed(2)} MB/s`
  );
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  process.exit();
});
