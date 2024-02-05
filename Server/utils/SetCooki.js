import Jwt  from "jsonwebtoken";


export const addCookie=(user,res,message)=>
{
   const token1=Jwt.sign({email:user.email},process.env.secreatte_key);

    // res.status(statusCode);

    const option={
        expires:new Date(Date.now()+3*24*60*60*1000),
        httpOnly:true,
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true,
    }
   return res.cookie("restoken",token1,option).status(200).json({
        success:true,
        message,
        user
        
    })
}