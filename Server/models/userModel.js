import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:
    {
        type:String,
        required:true,
        unique:true
    },
    pic:{
        type:String,
       
        default:"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
    }
},
{
    timestamps:true,
});

export const User=mongoose.model("User",userSchema);