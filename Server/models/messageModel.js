import mongoose from "mongoose";
import { Schema } from "mongoose";

const mesgModel=mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        trim:true,
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    },
},
{
    timestamps:true,
})

export const Message=mongoose.model("Message",mesgModel);