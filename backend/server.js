import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import cookieParser from "cookie-parser";

import connectDB from "./database/connectDB.js";

import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { logoutController } from "./controllers/userController.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();

const port = process.env.PORT || 5050;
const connectionString = process.env.MONGO_URL;

// Start MIDDLEWARES
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());
app.use("/", userRouter);
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

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// startServer();
