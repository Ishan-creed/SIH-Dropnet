import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from "validator";
import dotenv from 'dotenv';
dotenv.config();

const createToken = (_id) => {

    const jwtKey = process.env.JWT_KEY;

    return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });


}

export const registerUser = async (req, res) => {

    try {

        const { userName, email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (user) {
            res.status(400).json("User already Exists !");
        }

        if (!userName || !email || !password) return res.status(400).json("All fields are required");

        if (!validator.isEmail(email)) return res.status(400).json("Invalid Email ID provided");

       
        user = new userModel({ userName, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = createToken(user._id);

        res.status(200).json({ _id: user._id, userName, email, token });

    } catch (error) {
        res.status(500).json(error);
    }

};

export const loginUser = async (req,res) => {
    
   const {email,password} = req.body;

   try {
    
    let user = await userModel.findOne({email});

    if(!user) return res.status(400).json("Invalid email or password...");

    const isValidPassword = await bcrypt.compare(password,user.password);

    if(!isValidPassword) return res.status(400).json("Invalid Email or password...");

    
    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, userName:user.userName, email, token });

   } catch (error) {
    res.status(500).json(error);
   }

};



