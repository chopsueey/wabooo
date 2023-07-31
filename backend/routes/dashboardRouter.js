import express from "express";
import * as profileController from "../controllers/profileController.js";
import * as questionController from "../controllers/questionController.js";
import * as feedbackController from "../controllers/feedbackController.js";


import * as answerController from "../controllers/answerController.js";
import * as likeController from "../controllers/likeController.js";
import * as followController from "../controllers/followController.js";
import * as searchController from "../controllers/searchController.js";
import * as statisticController from "../controllers/statisticController.js";
//import { getStatistics } from "../controllers/statisticsController.js";

// import {
//   getAllProfiles,
//   createProfile,
//   deleteProfile,
// } from "../controllers/profileControllers.js";

import * as cloudyController from "../Upload/cloudyController.js"

import { profilePostSchema } from "../schema/profileSchema.js";
// import { feedbackPostSchema } from "../schema/feedbackSchema.js";
// //import { likePostSchema } from "../schema/likeSchema.js";
// import { questionPostSchema } from "../schema/questionSchema.js";
// //import { answerPostSchema } from "../schema/answerSchema.js";
import validate from "../middleware/validateAjv.js";

const dashboardRouter = express.Router();

// DASHBOARD QUESTION FEED
dashboardRouter.get("/feed/sort", questionController.getLatestQuestion);
dashboardRouter.get("/trend/sort", questionController.getAllQuestions);

// DASHBOARD/PROFILE
dashboardRouter.get("/profile", profileController.showProfile);
dashboardRouter.get("/profile/:profileId", profileController.getProfile);
dashboardRouter.get("/profile/:profileId/follower", followController.getFollower);
dashboardRouter.patch("/profile", profileController.updateProfileData);
dashboardRouter.put("/profile", profileController.editProfile);
dashboardRouter.delete("/profile", profileController.deleteAccount);

// DASHBOARD/CLOUDINARY
// dashboardRouter.get("/profile/cloudinary", cloudyController.getAllProfiles);
// dashboardRouter.post("/profile/cloudinary", cloudyController.createProfile);
dashboardRouter.delete("/profile/cloudinary", profileController.deleteImage);

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

//DASHBOARD/PROFILE/FOLLOWERS
dashboardRouter.get("/profile/:profileId/followers", followController.getFollower);
//dashboardRouter.delete("/profile/:profileId/followers", followController.removeFollower);

// DASHBOARD/PROFILE/FOLLOWING
dashboardRouter.get("/profile/:profileId/following", followController.getFollower);
//dashboardRouter.delete("/profile/:profileId/following", followController.unfollow);

//DASHBOARD/SEARCH
dashboardRouter.get("/search", searchController.searchFor);


// DASHBOARD/STATISTICS
dashboardRouter.get("/statistics/:questionId", statisticController.findProfilesByQuestionId);


//DASHBOARD/COMMENT
dashboardRouter.get("/question/:questionId/allcomments", questionController.getComment);
dashboardRouter.post("/question/:questionId/comment", questionController.postComment);
// dashboardRouter.delete("/question/:questionId/comment", answerController.deleteAnswer);


export default dashboardRouter;
