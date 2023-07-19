import mongoose from "mongoose";

// added a reference to the user, the profile belongs to
export const countries = [
  "France",
  "Spain",
  "England",
  "Germany",
  "Austria",
  "Ireland",
  "Norway",
  "Egypt",
  "Russia",
  "Turkey",
  "China",
  "Finland",
  "Italy",
  "Croatia",
  "Serbia",
  "Slovakia",
  "Greece",
  "Japan",
  "Bulgaria",
  "Bosnia-Herzegovina",
  "Liechtenstein",
  "Canada",
  "USA",
  "Congo",
  "Nigeria",
  "Morocco",
  "Other",
];

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
