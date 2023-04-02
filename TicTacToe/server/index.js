const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
// const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
const connection = require("./db");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// apply this middleware to all of our routes in order to be able to accept json as form of data
// when we send data from front end
app.use(express.json());
app.use("/api/auth", authRoutes);

connection();


app.listen(process.env.PORT,()=>{
    console.log(`Listening on ${process.env.PORT}`)
});

