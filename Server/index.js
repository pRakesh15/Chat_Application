import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "node:http";
import { config } from "dotenv";
import { router } from "./routes/userRout.js";
import { errorMiddleWare } from "./middleware/errorh.js";
import * as chartModel from "./routes/chaerRout.js";
import * as messagerout from "./routes/messageRoutes.js";
import { Server } from "socket.io";
export const app = express();
// app.use(cors());

config();

const corsConfig = {
  credentials: true,
  origin: true,
};

//MiddelWares....
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(errorMiddleWare);

//routes

app.use("/api/v1/user", router);
app.use("/api/v1/chart", chartModel.router);
app.use("/api/v1/message", messagerout.router);
//functions for create socket's..
export const server = createServer(app);
const io = new Server(server);

//function for creating connection and passing data through socket.io

io.on("connection", (socket) => {
  //socket connected successuffly
  // console.log('connecteed to socket.io');
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log(userData._id)
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    //    console.log("joined"+room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecived) => {
    var chat = newMessageRecived.chat;
    if (!chat.users) return console.log("chat.users is  note define");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecived.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecived);
    });
  });
});

app.get("/", (req, res) => {
  res.send("Jay shree ram");
});
