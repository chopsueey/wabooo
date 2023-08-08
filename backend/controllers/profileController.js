import Answer from "../model/answeredModel.js";
import Follow from "../model/followModel.js";
import Like from "../model/likeModel.js";
import Profile from "../model/profileModel.js";
import Question from "../model/questionModel.js";
import User from "../model/userModel.js";

import { cloudinary } from "../Upload/cloudinary.js";

// get
// Profil anzeigen
async function showProfile(req, res, next) {
  const numOfQuestionsToShow = 10;
  try {
    const userId = req.user.userId;

    const userProfile = await Profile.findOne({ userId: userId });

    // find only questions of user profile
    const askedQuestions = await Question.find({
      profileId: { $eq: `${userProfile._id}` },
    })
      .sort("-createdAt")
      // .limit(numOfQuestionsToShow)
      .populate({
        path: "profileId",
        select: "userName image",
      })
      .exec();

    const userAnswers = await Answer.find({
      user: userId,
    });
    const userLikes = await Like.find({
      user: userId,
    });

    // FOLLOWING
    // find all, the current profile is following
    const userIsFollowing = await Follow.find({
      followerProfileId: userProfile._id,
    });
    //Extract the followerProfileId from each follow document
    const followingIds = userIsFollowing.map(
      (follower) => follower.followingProfileId
    );
    // Find the corresponding profiles based on the followingIds
    const profilesTheUserIsFollowing = await Profile.find({
      _id: { $in: followingIds },
    });

    //  FOLLOWER
    // find all, who follow the current profile
    const userFollowers = await Follow.find({
      followingProfileId: userProfile._id,
    });
    //Extract the followerProfileId from each follow document
    const profileIdsOfFollower = userFollowers.map(
      (follower) => follower.followerProfileId
    );
    // Find the corresponding profiles based on the followerIds
    const profilesOfFollower = await Profile.find({
      _id: { $in: profileIdsOfFollower },
    });

    // find only liked questions by the user profile
    const likedQuestionsIds = userLikes.map((question) => question.question);
    const likedQuestions = await Question.find({
      _id: { $in: likedQuestionsIds },
    })
      .sort("-createdAt")
      // .limit(numOfQuestionsToShow)
      .populate({
        path: "profileId",
        select: "userName image",
      })
      .exec();

    res.status(200).json({
      askedQuestions: askedQuestions,
      likedQuestions: likedQuestions,
      userProfile: userProfile,
      userAnswers: userAnswers,
      userLikes: userLikes,
      userIsFollowing: profilesTheUserIsFollowing,
      userFollowers: profilesOfFollower,
    });
  } catch (error) {
    next(error);
  }
}

async function getProfile(req, res, next) {
  // we want to find information for how the current user
  // answered, liked etc. to certain questions
  // while loading the data of the requested profile
  // like: what questions asked the owner of the requested profile
  // and how, if they did, reacted the current user to them
  // and NOT how the user of the requested profile reacted to them
  // -> we only want to show how the current logged in user
  // reacted to the questions of the requested profile

  const userId = req.user.userId;
  const profileId = req.params.profileId;

  const numOfQuestionsToShow = 10;

  try {
    const userProfile = await Profile.findOne({ userId: userId });

    const profileOfRequestedProfileId = await Profile.findById(profileId);

    // find only questions of user profile
    const askedQuestions = await Question.find({
      profileId: { $eq: `${profileOfRequestedProfileId._id}` },
    })
      .sort("-createdAt")
      // .limit(numOfQuestionsToShow)
      .populate({
        path: "profileId",
        select: "userName image",
      })
      .exec();

    // find Answers, Likes and Follower/Following for current user
    // and not of the user which's profile was requested
    const userAnswers = await Answer.find({
      user: userId,
    });
    const userLikes = await Like.find({
      user: userId,
    });
// what the user of the requested profile likes
    const likesOfRequestedProfile = await Like.find({
      user: profileOfRequestedProfileId.userId,
    });

    // FOLLOWING
    // find all, the current profile is following
    const userIsFollowing = await Follow.find({
      followerProfileId: profileOfRequestedProfileId._id,
    });
    //Extract the followerProfileId from each follow document
    const followingIds = userIsFollowing.map(
      (follower) => follower.followingProfileId
    );
    // Find the corresponding profiles based on the followingIds
    const profilesTheUserIsFollowing = await Profile.find({
      _id: { $in: followingIds },
    });

    //  FOLLOWER
    // find all, who follow the current profile
    const userFollowers = await Follow.find({
      followingProfileId: profileOfRequestedProfileId._id,
    });
    //Extract the followerProfileId from each follow document
    const profileIdsOfFollower = userFollowers.map(
      (follower) => follower.followerProfileId
    );
    // Find the corresponding profiles based on the followerIds
    const profilesOfFollower = await Profile.find({
      _id: { $in: profileIdsOfFollower },
    });

    // find only liked questions by the user profile
    const likedQuestionsIds = likesOfRequestedProfile.map((question) => question.question);
    const likedQuestions = await Question.find({
      _id: { $in: likedQuestionsIds },
    })
      .sort("-createdAt")
      // .limit(numOfQuestionsToShow)
      .populate({
        path: "profileId",
        select: "userName image",
      })
      .exec();

    res.status(200).json({
      askedQuestions: askedQuestions,
      likedQuestions: likedQuestions,
      // profile of requested profile
      userProfile: profileOfRequestedProfileId,
      
      // data of current logged in user
      userAnswers: userAnswers,
      userLikes: userLikes,
      userIsFollowing: profilesTheUserIsFollowing,
      userFollowers: profilesOfFollower,
    });
  } catch (error) {
    next(error);
  }
}

// // post

// async function postProfileData(req, res, next) {
//   const { userName, nationality, age, userId } = req.body;

//   try {
//     const newProfile = Profile({
//       userName: userName,
//       nationality: nationality,
//       age: age,
//       userId: userId,
//     });

//     const savedProfile = await newProfile.save();
//     res.status(201).json(savedProfile);
//   } catch (err) {
//     next(err);
//   }
// }

// patch
async function updateProfileData(req, res, next) {
  const updateId = req.user.userId;
  const { image, imageUrl } = req.body;
  try {
    if (image && imageUrl) {
      // upload image to cloudinary
      const uploadedImage = await cloudinary.uploader.upload(
        imageUrl,
        {
          upload_preset: "Wabooo-Profile-Picture",
          public_id: `${image}`,
          allowed_formats: [
            "jpg",
            "png",
            "jpeg",
            "gif",
            "svg",
            "webp",
            "jfif",
            "ico",
          ],
        },
        function (error, result) {
          if (error) throw error;
        }
      );
      //console.log(uploadedImage);
      const cloudImg = uploadedImage.secure_url;
      const cloudImgPub = uploadedImage.public_id;
      req.body.image = cloudImg;
      req.body.imgPub = cloudImgPub;
    } else {
      delete req.body.image;
      delete req.body.imageUrl;
    }

    const updatedItem = await Profile.findOneAndUpdate(
      { userId: updateId },
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
      // { new: true, runValidators: true }
      // Object.entries(req.body).forEach(([key, value]) => {
      //   if (value !== null && value !== undefined) {
      //     // Include the field in the updateObject only if the value is not null or undefined
      //     updateObject[key] = value;
      //   }
      // });
    );
    res.status(200).json({
      updatedProfile: updatedItem,
    });
  } catch (err) {
    next(err);
  }
  // {
  //   userName: userName,
  //   country: country,
  //   birthYear: birthYear,
  //   image: cloudImg,
  //   imgPub: cloudImgPub,
  // },
}

// put
async function editProfile(req, res, next) {
  try {
    // Annahme: Benutzer-ID ist im req.user-Objekt verfügbar
    const userId = req.user.userId;

    // Aktualisierte Profildaten aus dem Request-Body erhalten
    const updatedProfile = req.body;

    // Benutzerprofil in der Datenbank aktualisieren
    const user = await User.findByIdAndUpdate(userId, updatedProfile, {
      new: true,
    });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// delete account
async function deleteAccount(req, res, next) {
  try {
    const accountId = req.user.userId;
    const deletedAccount = await User.findByIdAndDelete(accountId);
    console.log(deletedAccount);
    if (!deletedAccount) {
      return res.status(404).json({ error: "Account is not found" });
    }

    res.status(200).json({ message: "Account is deleted" });
  } catch (err) {
    next(err);
  }
}
// delete profile (should be account) plus image from cloudinary (not tested yet)
async function deleteImage(req, res, next) {
  const userId = req.user.userId;
  try {
    const userProfile = await Profile.findOne({ userId: userId });

    if (userProfile) {
      // delete image from cloudinary
      await cloudinary.uploader.destroy(userProfile.image);

      // update profile
      const updatedProfile = await Profile.findOneAndUpdate(
        { userId: userId },
        {
          $set: { image: "", imgPub: "" },
        },
        { new: true, runValidators: true }
      );
      res
        .status(200)
        .json({ message: "Image deleted", profile: updatedProfile });
    } else {
      res.status(404);
      throw new Error("Profile not found");
    }
  } catch (err) {
    next(err);
  }
}

export {
  showProfile,
  getProfile,
  editProfile,
  // postProfileData,
  updateProfileData,
  deleteImage,
  deleteAccount,
};
