import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoute from './Routes/userRoutes.js';
const app = express();

const PORT = process.env.PORT || 5000;

import dotenv from 'dotenv';
dotenv.config();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/',(req,res)=>{
    res.send("Hello WOrld!");
})

app.use('/api/users',userRoute);


mongoose.connect("mongodb+srv://myUser:user12345@cluster0.wk0dk.mongodb.net/SIH?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("mongo db connected...")).catch((error)=> console.log(error));



app.listen(PORT, ()=>{
    console.log("server running...");
});