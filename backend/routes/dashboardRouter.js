import express from "express";
import * as profileController from "../controllers/profileController.js";
import * as questionController from "../controllers/questionController.js";
import * as feedbackController from "../controllers/feedbackController.js";


import * as answerController from "../controllers/answerController.js";
import * as likeController from "../controllers/likeController.js";
import * as followController from "../controllers/followController.js";
import * as searchController from "../controllers/searchController.js";

// import { profilePostSchema } from "../schema/profileSchema.js";
// import { feedbackPostSchema } from "../schema/feedbackSchema.js";
// //import { likePostSchema } from "../schema/likeSchema.js";
// import { questionPostSchema } from "../schema/questionSchema.js";
// //import { answerPostSchema } from "../schema/answerSchema.js";
// import validate from "../middleware/validateAjv.js";

const dashboardRouter = express.Router();

// DASHBOARD QUESTION FEED
dashboardRouter.get("/feed/sort", questionController.getLatestQuestion);
dashboardRouter.get("/trend/sort", questionController.getAllQuestions);

// DASHBOARD/PROFILE
dashboardRouter.get("/profile", profileController.showProfile);
dashboardRouter.get("/profile/:profileId", profileController.getProfile);
dashboardRouter.get(
  "/profile/:profileId/follower",
  followController.getFollower
);
dashboardRouter.patch("/profile", profileController.updateProfileData);
dashboardRouter.put("/profile", profileController.editProfile);
dashboardRouter.delete("/profile", profileController.deleteAccount);

// DASHBOARD/MYQUESTIONS
dashboardRouter.get("/myquestions", questionController.getAllQuestions);
dashboardRouter.get("/myquestions/:id", questionController.getQuestion);
dashboardRouter.get("/question/:questionId", questionController.updateQuestion);
dashboardRouter.post("/myquestions", questionController.postQuestion);

//DASHBOARD/FEEDBACK
dashboardRouter.post("/feedback", feedbackController.postFeedback);

//DASHBOARD/ANSWER
dashboardRouter.post("/question/answer", answerController.answerCounter);
dashboardRouter.delete("/question/answer", answerController.deleteAnswer);

//DASHBOARD/LIKE
dashboardRouter.post("/question/likes", likeController.increaseLike);
dashboardRouter.delete("/question/likes", likeController.deleteLike);

//DASHBOARD/FOLLOW
dashboardRouter.post("/follow", followController.followUser);
dashboardRouter.delete("/unfollow", followController.deleteFollow);

//DASHBOARD/SEARCH
dashboardRouter.get("/search", searchController.searchFor);
export default dashboardRouter;
