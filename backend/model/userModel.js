/*
import mongoose from "mongoose";

const obj = {
  minLength: [2, "Die mindestlänge beträgt 2 Zeichen!"],
  maxLength: [30, "Die maximale Länge beträgt 30 Zeichen!"],
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        return v.length >= 2;
      },
       message: "The name requires minimum 2 letters!",
    },
  },

  email: {
    type: String,
    required: true,
    // unique: true,
    validate: {
      validator: (v) => {
        return v.includes("@") && v.includes(".");
      },
      message: (props) => `${props.value} ist keine gültige E-Mail!`,
    },
    // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },

  password: {
    type: String,
    required: true,
    match: [
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      "Das Passwort muss aus Groß-und Kleinbuchstaben bestehen und mindestens eine Zahl enthalten!",
    ],
  },
  //minlength: 8,
  // Mindestlänge des Passworts
});

const User = mongoose.model("User", userSchema);

export default User;
*/

import mongoose from "mongoose";

const obj = {
  minLength: [2, "Die Mindestlänge beträgt 2 Zeichen!"],
  maxLength: [30, "Die maximale Länge beträgt 30 Zeichen!"],
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        return v.length >= 2;
      },
      message: "The name requires minimum 2 letters!",
    },
  },

  email: {
    type: String,
    required: true,
    // unique: true,
    validate: {
      validator: (v) => {
        return v.includes("@") && v.includes(".");
      },
      message: (props) => `${props.value} ist keine gültige E-Mail!`,
    },
    // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },

  password: {
    type: String,
    required: true,
    match: [
      ///(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      ///^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-=_+{}[\]|;:"<>,./?])/,
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
      "The password shall have minimum 8 characters, including at least 1 upper case, 1 lower case, one number, 1 special character",
    ],
  },
  //minlength: 8,
  // Mindestlänge des Passworts
});

const User = mongoose.model("User", userSchema);

export default User;
