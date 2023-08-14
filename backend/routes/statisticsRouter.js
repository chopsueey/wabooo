import express from "express";
import * as statisticController from "../controllers/statisticController.js";

const statisticsRouter = express.Router();

// STATISTICS
statisticsRouter.get("/:questionId", statisticController.findProfilesByQuestionId);

export default statisticsRouter;