import express from 'express';
import Robot from "../../models/robot.model";
const router = express.Router();


router.get('/', (req, res) => {
  res.json({"hello":"moonstar7444"});
});

router.post("/", async (req, res) => {
  const newRobot = new Robot.Robot(req.body);
  const insertedRobot = await newRobot.save();
  return res.status(201).json(insertedRobot);
});


export default router;
