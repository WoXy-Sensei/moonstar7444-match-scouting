import express from "express";
import { connectToDatabase } from "../mongodb";


const router = express.Router();

router.get("/", async (req, res) => {
  const { database }: any = await connectToDatabase();
  const test = await database.collection("teams").find({}).toArray();
  res.json(test);
});

router.post("/", async (req, res) => {
    
  const data = req.body;
  
  const { database }: any = await connectToDatabase();
  const team = database.collection("teams").insertOne(req.body);
  res.json(team);
});

export default router;
