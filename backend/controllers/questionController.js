import Answer from "../model/answeredModel.js";
import Follow from "../model/followModel.js";
import Like from "../model/likeModel.js";
import Profile from "../model/profileModel.js";
import Question from "../model/questionModel.js";

// trend controller
export async function getAllQuestions(req, res, next) {
  const numOfQuestionsToShow = 10;
  const sortBy = req.query.sortBy;
  let sortTime = 168;

  try {
    // get user profile
    const userProfile = await Profile.findOne({ userId: req.user.userId });

    if (sortBy === "latest") {
      // latest questions not older than a week
      sortTime = 168;
    }
    if (sortBy === "lastHour") {
      // not older than one hour
      sortTime = 1;
    }
    if (sortBy === "last12Hours") {
      sortTime = 12;
    }
    if (sortBy === "last24Hours") {
      sortTime = 24;
    }
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() - sortTime);

    const sortedQuestions = await Question.aggregate([
      {
        $match: {
          createdAt: { $gte: currentTime },
        },
      },
      {
        $addFields: {
          totalAnswers: { $add: ["$yes", "$no"] },
        },
      },
      {
        $sort: {
          totalAnswers: -1,
          likes: -1,
        },
      },
      {
        $limit: numOfQuestionsToShow,
      },
      {
        $lookup: {
          from: "profiles",
          localField: "profileId",
          foreignField: "_id",
          as: "profile",
        },
      },
      {
        $addFields: {
          profileId: { $arrayElemAt: ["$profile", 0] },
        },
      },
      {
        $project: {
          "profile._id": 0,
          "profile.__v": 0,
        },
      },
    ]);

    const userAnswers = await Answer.find({
      user: req.user.userId,
    });
    const userLikes = await Like.find({
      user: req.user.userId,
    });

    // find all Follows, where the profileId of the current user
    // is stored in the key: followerProfileId
    const userIsFollowing = await Follow.find({
      followerProfileId: userProfile._id,
    });
    // find all Follows, where the profileId of the current user
    // is stored in the key: followingProfileId
    const userFollowers = await Follow.find({
      followingProfileId: userProfile._id,
    });

    return res.status(200).json({
      sortBy: sortBy,
      found: sortedQuestions,
      userAnswers: userAnswers,
      userLikes: userLikes,
      userIsFollowing: userIsFollowing,
      userFollowers: userFollowers,
    });

    // week
    // month
    // oldest?
  } catch (err) {
    next(err);
  }
}

// feed controller
export async function getLatestQuestion(req, res, next) {
  const numOfQuestionsToShow = 10;
  const sortBy = req.query.sortBy;
  let sortTime = 0;

  try {
    // get user profile
    const userProfile = await Profile.findOne({ userId: req.user.userId });

    if (sortBy === "latest") {
      // latest questions not older than a week
      sortTime = 168;
    }
    if (sortBy === "lastHour") {
      // not older than one hour
      sortTime = 1;
    }
    if (sortBy === "last12Hours") {
      sortTime = 12;
    }
    if (sortBy === "last24Hours") {
      sortTime = 24;
    }
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() - sortTime);

    const sortedQuestions = await Question.find({
      createdAt: { $gte: currentTime },
      profileId: { $ne: `${userProfile._id}` },
    })
      .sort("-createdAt")
      .limit(numOfQuestionsToShow)
      .populate("profileId", "userName")
      .exec();
    const userAnswers = await Answer.find({
      user: req.user.userId,
    });
    const userLikes = await Like.find({
      user: req.user.userId,
    });

    // find all Follows, where the profileId of the current user
    // is stored in the key: followerProfileId
    const userIsFollowing = await Follow.find({
      followerProfileId: userProfile._id,
    });
    // find all Follows, where the profileId of the current user
    // is stored in the key: followingProfileId
    const userFollowers = await Follow.find({
      followingProfileId: userProfile._id,
    });

    return res.status(200).json({
      sortBy: sortBy,
      found: sortedQuestions,
      userAnswers: userAnswers,
      userLikes: userLikes,
      userIsFollowing: userIsFollowing,
      userFollowers: userFollowers,
    });

    // week
    // month
    // oldest?
  } catch (err) {
    next(err);
  }
}

// feed controller
export async function updateQuestion(req, res, next) {
  const questionId = req.params.questionId;
  try {
    // get user profile
    const userProfile = await Profile.findOne({ userId: req.user.userId });

    const sortedQuestions = await Question.findById(questionId).populate(
      "profileId",
      "userName"
    );
    const userAnswers = await Answer.find({
      user: req.user.userId,
    });
    const userLikes = await Like.find({
      user: req.user.userId,
    });

    // find all Follows, where the profileId of the current user
    // is stored in the key: followerProfileId
    const userIsFollowing = await Follow.find({
      followerProfileId: userProfile._id,
    });
    // find all Follows, where the profileId of the current user
    // is stored in the key: followingProfileId
    const userFollowers = await Follow.find({
      followingProfileId: userProfile._id,
    });

    return res.status(200).json({
      found: sortedQuestions,
      userAnswers: userAnswers,
      userLikes: userLikes,
      userIsFollowing: userIsFollowing,
      userFollowers: userFollowers,
    });
  } catch (err) {
    next(err);
  }
}

// Eine einzelne Frage anzeigen
export async function getQuestion(req, res, next) {
  try {
    const userProfile = await Profile.findOne({ userId: req.user.userId });

    const questionId = req.params.id;

    const questions = await Question.findById(questionId)
      .populate("profileId", "userName")
      .exec();

    const userAnswers = await Answer.find({
      user: req.user.userId,
    });
    const userLikes = await Like.find({
      user: req.user.userId,
    });

    // find all Follows, where the profileId of the current user
    // is stored in the key: followerProfileId
    const userIsFollowing = await Follow.find({
      followerProfileId: userProfile._id,
    });
    // find all Follows, where the profileId of the current user
    // is stored in the key: followingProfileId
    const userFollowers = await Follow.find({
      followingProfileId: userProfile._id,
    });

    if (!questions) {
      return res.status(404).json({ message: "Frage nicht gefunden" });
    }

    res.status(200).json({
      found: questions,
      userAnswers: userAnswers,
      userLikes: userLikes,
      userIsFollowing: userIsFollowing,
      userFollowers: userFollowers,
    });
  } catch (error) {
    next(error);
  }
}

// post
export async function postQuestion(req, res, next) {
  const { question, topics } = req.body;
  const userId = req.user.userId;

  try {
    const userProfile = await Profile.findOne({ userId: userId });
    const newQuestion = Question({
      question: question,
      profileId: userProfile._id,
      topics: topics,
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    next(err);
  }
}
