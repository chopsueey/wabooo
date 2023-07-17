import profileModel from "../Upload/cloudyModel.js";
import { cloudinary } from "../Upload/cloudinary.js";

// get all products
// @desc   Fetch all products

async function getAllProfiles(req, res) {
  const profiles = await profileModel.find({});
  res.status(200).json(profiles);
}

// @desc   create a product
// @route  POST /api/products

async function createProfile(req, res) {
  const { name, country, birthYear, image } = req.body;

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
  try {
    const profile = new profileModel({
      name,
      country,
      birthYear,
      image: cloudImg,
      imgpub: cloudImgPub,
    });
    await profile.save();
    res.status(201).json({ message: "Profile saved" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Profile not saved (some mistake occured)" });
  }
}

// @desc   Delete a profile
// @route  DELETE /profile/:id

async function deleteProfile(req, res) {
  const profile = await profileModel.findById(req.params.id);

  if (profile) {
    // delete image from cloudinary
    await cloudinary.uploader.destroy(profile.imgpub);
    // delete product from db
    await profileModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Profile deleted" });
  } else {
    res.status(404);
    throw new Error("Profile not found");
  }
}

export { getAllProfiles, createProfile, deleteProfile };
