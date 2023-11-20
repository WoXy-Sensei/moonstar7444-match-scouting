import express from "express";
import { connectToDatabase } from "../mongodb";
import { put } from "@vercel/blob";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
  const { database }: any = await connectToDatabase();
  const competitionId = req.query.competitionId;
  if (competitionId) {
    const robots = await database
      .collection("robots")
      .find({ teamCompetition: competitionId })
      .toArray();
    res.json(robots);
    return;
  }
  const robots = await database.collection("robots").find({}).toArray();
  res.json(robots);
  return;
});

router.post("/", async (req, res) => {
  const { database }: any = await connectToDatabase();

  const findTeam = await database.collection("robots").findOne({
    teamName: req.body.teamName,
    teamNumber: req.body.teamNumber,
    teamCompetition: req.body.competition,
  });

  if (findTeam) {
    return res.status(400).json({ message: "Team already exists" });
  }

  let image = (req.files as any).image;

  const { url } = await put("uploads/test.png", image.data, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  const insert = database.collection("robots").insertOne({
    teamName: req.body.teamName,
    teamNumber: req.body.teamNumber,
    image: url,
    teamCountry: req.body.teamCountry,
    teamCompetition: req.body.competition,
    teamDescription: req.body.description,
    motorType: req.body.motorType,
    driveType: req.body.driveType,
    teamRating: req.body.teamRating,
    rookieYear: req.body.rookieYear,
    robotWeight: req.body.robotWeight,
    robotHeight: req.body.robotHeight,
    robotMeasurement: {
      left: req.body.left,
      right: req.body.right,
      front: req.body.front,
      back: req.body.back,
    },
  });

  res.json(insert);
});

export default router;
