import express from "express";
import * as user from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
// import { validateUser } from "../middleware/validateUser.js";
// import {check, validationResult} from "express-validator";
import { userPostSchema } from "../schema/userSchema.js";
import validate from "../middleware/validateAjv.js";

// const validateUserInput = [
//     check("name").notEmpty().bail().isLength({min:2, max:30}).withMessage("The name is not correct!"),
//     check("email").isEmail().withMessage("Bitte eine korrekte E-Mail adresse eingeben!"),
//     check("password").notEmpty().isLength({min:8, max:30}).matches(/[-_$#]/).withMessage("Bitte ein gültiges Passwort eingeben!"),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()){
//             return  res.status(400).json({errors:errors.array()});
//             // throw new Error(errors.array()[0].msg)
//         }
//         next();
//     }
// ]

const userRouter = express.Router();

// create / post
//userRouter.post("/register", user.createUserController);
userRouter.post(
  "/register",
  validate(userPostSchema),
  user.createUserController
);

// login
userRouter.post("/login", user.loginController);

// userRouter.get("/user/data", authMiddleware, user.getUserDataController);



// logout
userRouter.get("/logout", user.logoutController);

export default userRouter;
