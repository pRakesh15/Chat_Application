import Jwt  from "jsonwebtoken";
import { User } from "../models/userModel.js";


export const authorization=async(req,res,next)=>
{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        try {
            const token=req.headers.authorization.split(" ")[1];
            if(!token)
            {
                return res.status(500).json({
                    success:false,
                    message:"login First",
                });
            }
            else
            {
                const decod=Jwt.verify(token,process.env.secreatte_key);
                req.user=await User.findOne({email:decod.email}).select("-password");
                next();
            }

           
        } catch (error) {
            res.status(401);
            throw new Error("Note authorize !!");
            
        }
    }
}