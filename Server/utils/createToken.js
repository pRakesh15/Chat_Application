import Jwt from "jsonwebtoken";

export const generateToken=(email)=>
{
 return Jwt.sign({email},process.env.secreatte_key);
}
