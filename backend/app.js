import express from "express";
import mongoose from "mongoose";
import Robot from "./models/robot.model.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  


app.get("/", (req, res) => {
  res.send("Pit Scouting Server");
});

app.post("api/team", async (req, res) => {
  const newRobot = Robot.Robot(req.body);
  const insertedRobot = await newRobot.save();
  return res.status(201).json(insertedRobot);
});


const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      "mongodb+srv://bardiaramez:bardia1386@spotify.bg1xthc.mongodb.net/teamscout?retryWrites=true&w=majority"
    );
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
