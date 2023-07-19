import Answer from "../model/answeredModel.js";
import Follow from "../model/followModel.js";
import Like from "../model/likeModel.js";
import Profile from "../model/profileModel.js";
import Question from "../model/questionModel.js";

export async function searchFor(req, res, next) {
  try {
    const userSearch = req.query.s;
    const foundQuestions = await Question.find({
      question: { $regex: userSearch, $options: "i" },
    })
      .sort("-createdAt")
      .populate({
        path: "profileId",
        select: "userName image",
      });
    const topicRelatedQuestions = await Question.find({
      topics: { $regex: userSearch, $options: "i" },
    })
      .sort("-createdAt")
      .populate({
        path: "profileId",
        select: "userName image",
      });
    // get user profile
    const userProfile = await Profile.findOne({ userId: req.user.userId });

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
      found: foundQuestions,
      topicRelated: topicRelatedQuestions,
      userAnswers: userAnswers,
      userLikes: userLikes,
      userIsFollowing: userIsFollowing,
      userFollowers: userFollowers,
    });
  } catch (err) {
    next(err);
  }
}
