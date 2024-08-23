import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import * as statisticController from "./controllers/statisticController.js";
import cookieParser from "cookie-parser";

import connectDB from "./database/connectDB.js";

import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import statisticsRouter from "./routes/statisticsRouter.js";

import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(import.meta.url);

const __filename = path.dirname(__dirname);

const app = express();

const port = process.env.PORT || 5050;
const connectionString = process.env.MONGO_URL;

app.use(express.static(path.join(__dirname, "../../dist")));



// Start MIDDLEWARES
// app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use("/", userRouter);

app.use("/statistics", statisticsRouter);
app.use("/dashboard", authMiddleware, dashboardRouter);

// Operational error handling
//app.get("/", (req, res, next) => {
// mimic an error by throwing an error to break the app!
//throw new Error("Something went wrong");
//res.send("Welcome to main route!")
//})

//to send a response on any error
// app.use(function (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

(async () => {
  try {
    await connectDB(connectionString);
    console.log("Mit MONGODB verbunden!");
    //
    app.listen(port, () => {
      console.log(`Server läuft auf Port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// startServer();
