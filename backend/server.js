import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./database/connectDB.js";
import userRouter from "./routes/userRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import statisticsRouter from "./routes/statisticsRouter.js";
import * as statisticController from "./controllers/statisticController.js";



// *************************



dotenv.config();

const __dirname = fileURLToPath(import.meta.url);
const __filename = path.dirname(__dirname);
const port = process.env.PORT || 5050;
const connectionString = process.env.MONGO_URL;

const app = express();

app.use(express.static(path.join(__dirname, "../../dist")));

// utility middlewares
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

// main routes
app.use("/", userRouter);
app.use("/statistics", statisticsRouter);
app.use("/dashboard", authMiddleware, dashboardRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

// error handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

startServer();

async function startServer() {
  try {
    await connectDB(connectionString);
    console.log("Connected to mongoDB.");

    app.listen(port, () => {
      console.log(`Server is running on: http://localhost:${port}.`);
    });
  } catch (error) {
    console.log(error);
  }
}

//to send a response on any error
// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });