import mongoose from "mongoose";

const User2Schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 100,
      },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    username: {
        type:String,
        required:true,
        min:6
    },
    phoneNumber: {
        type:String,
        required:true,
        min:6
    },
    role: {
      type: String,
      required:true,
    },
  },
  { timestamps: true }
);

const User2 = mongoose.model("User2", User2Schema);
export default User2;
