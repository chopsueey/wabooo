import Profile from "../model/profileModel.js";
import { cloudinary } from "./cloudinary.js";

// get all products
// @desc   Fetch all products

async function getAllProfiles(req, res) {
  const profiles = await Profile.find({});
  res.status(200).json(profiles);
}

// @desc   create a profile
// @route  POST /api/profiles

async function createProfile(req, res) {
  const { name, country, birthYear, image } = req.body;
  try {
    // upload image to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(
      image,
      {
        upload_preset: "cloudimage",
        public_id: `${name}`,
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
    //
    //   const profile = new profileModel({
    //     name,
    //     country,
    //     birthYear,
    //     image: cloudImg,
    //     imgpub: cloudImgPub,
    //   });
    //   await profile.save();
    res.status(201).json({ msg: { cloudImg, cloudImgPub } });
  } catch (error) {
    res.status(500).json({ message: "Mistake with saving the profile" });
  }
}

// @desc   Delete a profile
// @route  DELETE /profile/:id

async function deleteProfile(req, res) {
  const profile = await Profile.findById(req.params.id);

  if (profile) {
    // delete image from cloudinary
    await cloudinary.uploader.destroy(profile.imgpub);
    // delete profile from db
    await Profile.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Profile deleted" });
  } else {
    res.status(404);
    throw new Error("Profile not found");
  }
}

export { getAllProfiles, createProfile, deleteProfile };
