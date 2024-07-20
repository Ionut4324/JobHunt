const express = require("express");
const app = express();

const db = require("./db.js");
const path = require("path");
const { Server } = require("socket.io");
const cors = require("cors");
const http = require("http");

app.use(cors({
  origin: 'http://localhost:3000'
}))

const jobsRoute = require('./routes/jobsRoute')
const userRoute = require('./routes/usersRoute')
const conversationRoute = require('./routes/conversationsRoute')
app.use(express.json())

app.use('/api/jobs/', jobsRoute)
app.use('/api/users/', userRoute)
app.use('/api/conversations/', conversationRoute)

const port = 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// if (process.env.NODE_ENV === 'production') {
//   app.use('/', express.static('client/build'))

//   app.get("*", (req, res) => {

//     res.sendFile(path.join(__dirname, 'client/build/index.html'))

//   });
// }

app.listen(port, () => console.log(`Node JS Server Started on port ${port} `));

server.listen(5008, () => {
  console.log("Socket Server Started");
});