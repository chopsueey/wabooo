import { createToken } from "../lib/auth.js";
import Profile from "../model/profileModel.js";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";

// POST / CREATE

export async function createUserController(req, res, next) {
  try {
    // hash and salt password
    const saltRound = 12;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedSaltedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedSaltedPassword;

    // create new user
    const newUser = User(req.body);
    const savedUser = await newUser.save();

    // create profile when user registers
    const newProfile = Profile({
      userName: req.body.userName,
      userId: savedUser._id,
    });
    const savedProfile = await newProfile.save();
    res.status(201).json({
      message: "test response, 201 status should be empty",
      user: savedUser,
      profile: savedProfile,
    });
  } catch (error) {
    next(error);
  }
}

// LOGIN

export async function loginController(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const userProfile = await Profile.findOne({ userId: user._id });
        // console.log(userProfile)
        const profileId = userProfile._id;
        const token = await createToken({ userId: user._id });
        return res
          .status(200)
          .cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "none", secure: true }) // expires after 24 hours
          .cookie("isLoggedIn", true, { maxAge: 24 * 60 * 60 * 1000, sameSite: "none", secure: true })
          .json({
            message: "Login successful.",
            userId: user._id,
            profileId: profileId,
          });
      }
      return res
        .status(400)
        .json("Zugriff verweigert! Die Anmeldedaten sind falsch.");
    }
    res.status(404).json("Benutzer nicht gefunden");
  } catch (error) {
    next(error);
  }
}

// Logout
export async function logoutController(req, res, next) {
  // Clear the cookie by setting it to an empty value and expiring it immediately
  try {
    res
      .status(201)
      .clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true })
      .clearCookie("isLoggedIn", {sameSite: "none", secure: true})
      .json({ message: "Logout successful!" });
  } catch (err) {
    next(err);
  }
}
/*import { createToken } from "../lib/auth.js";
import Profile from "../model/profileModel.js";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";

// POST / CREATE

export async function createUserController(req, res, next) {
  try {
    // Hash and salt password
    const saltRound = 12;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedSaltedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedSaltedPassword;

    // Create new user
    const newUser = User(req.body);
    const savedUser = await newUser.save();

    // Create profile when user registers
    const newProfile = Profile({
      userName: req.body.userName,
      userId: savedUser._id,
    });
    const savedProfile = await newProfile.save();
    
    res.status(201).json({
      message: "Registration successful.",
      user: savedUser,
      profile: savedProfile,
    });
  } catch (error) {
    next(error);
  }
}

// LOGIN

export async function loginController(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        const userProfile = await Profile.findOne({ userId: user._id });
        const profileId = userProfile._id;
        const token = await createToken({ userId: user._id });
        
        // Set JWT token as cookie and mark user as logged in
        res
          .status(200)
          .cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }) // Expires after 24 hours
          .cookie("isLoggedIn", true, { maxAge: 24 * 60 * 60 * 1000 })
          .json({
            message: "Login successful.",
            userId: user._id,
            profileId: profileId,
          });
      } else {
        res.status(401).json("Zugriff verweigert! Die Anmeldedaten sind falsch.");
      }
    } else {
      res.status(404).json("Benutzer nicht gefunden");
    }
  } catch (error) {
    next(error);
  }
}

// Logout
export async function logoutController(req, res, next) {
  try {
    // Clear the JWT token cookie and isLoggedIn cookie
    res
      .status(201)
      .clearCookie("jwt", { httpOnly: true })
      .clearCookie("isLoggedIn")
      .json({ message: "Logout successful!" });
  } catch (err) {
    next(err);
  }
}
*/
