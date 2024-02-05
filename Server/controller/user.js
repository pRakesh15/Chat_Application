import bcrypt from "bcrypt";

import { User } from "../models/userModel.js";
import { addCookie } from "../utils/SetCooki.js";
import { generateToken} from "../utils/createToken.js";

//create user
export const createUser = async (req, res, next) => {
  try {
    const { username, email, password, pic } = req.body;
    let oldUser = await User.findOne({ email });

    if (!oldUser) {
      const hasPassword = await bcrypt.hash(password, 10);
      let user = await User.create({
        username,
        email,
        password: hasPassword,
        pic,
      });
      if(user)
      {
        res.status(201).json({
          _id:user._id,
          username:user.username,
          email:user.email,
          pic:user.pic,
          token: generateToken(user.email),
          message:"Registered Successfully!!"
        })
      }

      // addCookie(user, res, "Registered Successfully!!");
    } else {
      return res.status(404).json({
        success: false,
        message: "User  alredy exist !!",
      });
    }
  } catch (error) {
    next(error);
  }
};

//Logiin User

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password !",
      });
    } else {
      const Mpassword = await bcrypt.compare(password, user.password);
      if (!Mpassword) {
        return res.status(404).json({
          success: false,
          message: "Invalid Email or Password",
        });
      } else {
        res.status(201).json({
          _id:user._id,
          username:user.username,
          email:user.email,
          pic:user.pic,
          token: generateToken(user.email),
          message:`Welcome back ,${user.username}`
        })
        // addCookie(user, res, `Welcome back ,${user.username}`);
      }
    }
  } catch (error) {
    next(error);
  }
};

//function for userSerachingApi

export const allUser = async (req, res, next) => {
  try {
    const keyWord = req.query.search
      ? {
          $or: [
            { username: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyWord).find({ _id: { $ne: req.user._id } });
    if(users)
    {
      res.send(users);
    }
    else
    {
      res.status(404).json({
        success:false,
        message:"Entered user is note found"
      })
    }

  
  } catch (error) {
    next(error);
  }
};
