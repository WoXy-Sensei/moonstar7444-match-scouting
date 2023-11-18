import express from "express";
import { connectToDatabase } from "../mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  const { database }: any = await connectToDatabase();
  const test = await database.collection("robots").find({}).toArray();
  res.json(test);
});

router.post("/", async (req, res) => {
  const { database }: any = await connectToDatabase();

  const findTeam = await database.collection("robots").findOne({
    teamName: req.body.teamName,
    teamNumber: req.body.teamNumber,
  });

  if (findTeam) {
    return res.status(400).json({ message: "Team already exists" });
  }

  let image = (req.files as any).image;
  image.mv(
    "./public/uploads/" +
      `${req.body.teamName.replace(" ", "-").toLowerCase()}-${
        req.body.teamNumber
      }.png`
  );

  const insert = database.collection("robots").insertOne({
    teamName: req.body.teamName,
    teamNumber: req.body.teamNumber,
    image: `uploads/${req.body.teamName.replace(" ", "-").toLowerCase()}-${
      req.body.teamNumber
    }.png`,
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
