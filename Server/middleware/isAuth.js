import { User } from "../models/userModel.js"
import Jwt  from "jsonwebtoken"


export const isAutharised=async(req,res,next)=>
{
    const {token1}=req.cookie.restoken;

    if(!token1)
    {
        return res.status(500).json({
            success:false,
            message:"login First",
        });
    }
    else
    {
        const decod=Jwt.verify(token1,process.env.secreatte_key);
        req.User=await User.findOne({email:decod.email});
        next();
    }
};

// export const restiricttoLoginUseronly=async(req,res,next)=>
// {
//     const userId=req.headers['Authorization'];
//     if(!userId) return res.status(401).json({
//         success:false,
//         message:"login 1st",
//     })
    
//     const token=userId.split('Bearer ')[1];
//     const user=

// }