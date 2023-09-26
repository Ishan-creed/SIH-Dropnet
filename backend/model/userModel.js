import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

   userName: {
    type:String,
    required:true,
    minlength:3,
    maxlength:30
   },
   email: {
    type: String,
    required: true,
    minlength:3,
    maxlength:200,
    unique:true
   },
   
   password:{
    type:String,
    required:true,
    minlength:3,
    maxlength:1024
   },



},{
    timestamps:true
})

const userModel = mongoose.model("userModel",userSchema);

export default userModel;