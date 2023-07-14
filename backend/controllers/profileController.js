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

    // find only liked questions by the user profile
    const likedQuestionsIds = userLikes.map((question) => question.question);
    const likedQuestions = await Question.find({
      _id: { $in: likedQuestionsIds },
    })
      .sort("-createdAt")
      .limit(numOfQuestionsToShow)
      .populate("profileId", "userName")
      .exec();

    res.status(200).json({
      askedQuestions: askedQuestions,
      likedQuestions: likedQuestions,
      userProfile: userProfile,
      userAnswers: userAnswers,
      userLikes: userLikes,
      userIsFollowing: userIsFollowing,
      userFollowers: userFollowers,
    });
  } catch (error) {
    next(error);
  }
}

async function getProfile(req, res, next) {
  try {
    const userId = req.user.userId;
    const profileId = req.params.profileId;

    const userProfile = await Profile.findById(profileId);

    res.status(200).json(userProfile);
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
  const { userName, country, birthYear, image, imageUrl } = req.body;
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
