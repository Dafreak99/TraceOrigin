const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = express();

  app.get("/hello", (req, res) => {
    res.send("Hello World");
  });

  io.on("connection", (socket) => {
    console.log("connection");
    socket.emit("status", "Hello from Socket.io");

    socket.on("disconnect", () => {
      console.log("client disconnected");
    });
  });

  app.all("*", (req, res) => nextHandler(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
