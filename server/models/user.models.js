import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type : String ,
    required: true,
    unique: true,
    min: 3,
    max : 20
  },
  email: {
    type : String ,
    required: true,
    unique:true,
    max: 50
  },
  password: {
    type : String ,
    required: true, 
    unique : true,
    max: 8
  },
  isAvtarSet : {
    type :Boolean,
    default : false
  },
  avatarImage: {
    type: String,
    default: ""
  }
}, {timestamps: true})

export const User = mongoose.model("User" , userSchema);