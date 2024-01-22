import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import * as middlewares from "./middlewares";
import api from "./api";
import MessageResponse from "./interfaces/MessageResponse";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(fileUpload());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json({ limit: "50mb" }));

app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "hello moonstar7444 pit scouting api",
  });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
