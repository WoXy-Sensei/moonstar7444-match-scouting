import express from "express";
import { connectToDatabase } from "../mongodb";

const router = express.Router();


router.get("/", async (req, res) => {
  const { database }: any = await connectToDatabase();
  const test = await database.collection("teams").find({}).toArray();
  res.json(test);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  
  let image = (req.files as any).image;
  
    
  res.json({message : "hello"});
});

export default router;
