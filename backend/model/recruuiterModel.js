import mongoose from "mongoose";

const RecruiterSchema = new mongoose.Schema({
   

    orgName:{
        type:String
    },
    domainType:{
        type:String,
        ENUM:['Medical','Factory','Corporate','Personal','Education']
    },
    jobProfielTitle:{
        type:String
    },
    Salary:{
        type:Number
    }



},{
    timestamps:true
})

const RecruiterModel = mongoose.model("recruiterModel",RecruiterSchema);

export default RecruiterModel;