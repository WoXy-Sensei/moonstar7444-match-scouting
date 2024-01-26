import express from "express";
import { connectToDatabase } from "../mongodb";
import dotenv from "dotenv";
import { convertToBoolean } from "../utils/convertToBoolean";
dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
  const { database }: any = await connectToDatabase();
  const competitionId = req.query.competitionId;
  const teamNumber = req.query.teamNumber;
  const unique = req.query.unique;
  if (competitionId && teamNumber && !unique) {
    const robots = await database
      .collection("teams")
      .find({ competitionId: competitionId, teamNumber: teamNumber })
      .toArray();
    res.json(robots);
    return;
  }
  if (competitionId && unique) {
    const robots = await database
      .collection("teams")
      .find({ competitionId: competitionId, match: 1 })
      .toArray();
    res.json(robots);
    return;
  }
  res.json({ message: "Team not found" });
  return;
});

router.post("/", async (req, res) => {
  const { database }: any = await connectToDatabase();
  let match_count = 1;

  const team = await database
    .collection("teams")
    .find({
      competitionId: req.body.competitionId,
      teamNumber: req.body.teamNumber,
    })
    .toArray();

  if (team) {
    match_count = team.length;
    match_count = match_count + 1;
  }

  console.log(req.body.failedAutonomous);
  console.log(req.body.competitionId);

  const insert = database.collection("teams").insertOne({
    teamName: req.body.teamName,
    teamNumber: req.body.teamNumber,
    competitionId: req.body.competitionId,
    failedAutonomous: convertToBoolean(req.body.failedAutonomous),
    match: match_count,
    startPosition: {
      x: req.body.startPositionX,
      y: req.body.startPositionY,
    },
    autonomous: {
      ampNotes: req.body.autonomousAmpNotes,
      speakerNotes: req.body.autonomousSpeakerNotes,
      leftStartingZone: convertToBoolean(req.body.autonomousLeftStartingZone),
    },
    teleop: {
      ampNotes: req.body.ampNotes,
      speakerNotes: req.body.speakerNotes,
      defenseRating: req.body.defenseRating,
      driveRating: req.body.driveRating,
      failedTeleop: convertToBoolean(req.body.failedTeleop),
    },
    endGame: {
      endLocation: req.body.endLocation,
      failedClimb: convertToBoolean(req.body.failedClimb),
      trapNote: convertToBoolean(req.body.trapNote),
      comments: req.body.comments,
    },
  });

  res.json(insert);
});

export default router;
