import mongoose from "mongoose";
import { countries } from "./data.js";

let enums = {
  values: countries,
  message: "Please, choose your country",
};

const ProfileSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    //unique: true,
    minlength: 2,
    validate: {
      validator: (v) => {
        return v.length >= 2 && !/^\d+$/.test(v);
      },
      message: "Username shall have minimum 2 letters",
    },
  },
  country: {
    type: String,
    // required: true,
    enum: enums,
  },
  birthYear: {
    type: Number,
    // required: true,
    max: [2005, "You shall be minimum 18 years old"],
  },
  image: { type: String },
  imgPub: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
