import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   },
   /*customerId: {
      type: String,
      required: true,
      unique: true
   },*/
   email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
   },
   password: {
      type: String,
      required: true,
      minlength: 8 
      // Mindestlänge des Passworts
   },
   
   
});

const User = mongoose.model("User", userSchema);

export default User;
