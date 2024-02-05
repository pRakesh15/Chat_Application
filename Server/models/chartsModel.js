import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema=mongoose.Schema({
    chartName:{
        type:String,
        trim:true
    },
    isGroupChart:{
        type:Boolean,
        default:false
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
    },
    groupAddmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},
{
    timestamps:true,
});

export const Chat=mongoose.model("Chat",schema);