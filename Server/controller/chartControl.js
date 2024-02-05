import { Chat } from "../models/chartsModel.js";
import { User } from "../models/userModel.js";


//Function for craeting or Fetching one on one chart
export const accessChart = async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("userId is note send with request");
    return res.sendStatus(400);
  }

  var isChart = await Chat.find({
    isGroupChart: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChart = await User.populate(isChart, {
    path: "latestMessage.sender",
    select: "username pic email",
  });
  if (isChart.length > 0) {
    res.send(isChart[0]);
  } else {
    var chartData = {
      chartName: "sender",
      isGroupChart: false,
      users: [req.user._id, userId],
    };
    try {
      const createChart = await Chat.create(chartData);

      const FullChart = await Chat.findOne({ _id: createChart._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChart);
    } catch (error) {
      next(error);
    }
  }
};

//api for fetching all the chat

export const fetchChat=async(req,res,next)=>
{
try {
  Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
  .populate("users", "-password")
  .populate("groupAddmin","-password")
  .populate("latestMessage")
  .sort({updatedAt:-1})
  .then(async(resultIs)=>
  {
    resultIs=await User.populate(resultIs, {
      path: "latestMessage.sender",
      select: "username pic email",
    });
    res.status(200).send(resultIs)
  })

} catch (error) {
  next(error)
}
}

//creating api for Group chart

export const createGroupChart=async(req,res,next)=>
{
  if(!req.body.users || !req.body.name)
  {
    return res.status(400).json({
      sucess:false,
      message:"pleease fill all the fild"
    })
  }

  var users=JSON.parse(req.body.users);

  if(users.length<2)
  {
    return res.status(400).json({
      sucess:false,
      message:"more than 2 people requre to create a group chat"
    })
  }

  users.push(req.user);
  try {
    const groupChat=await Chat.create({
      chartName:req.body.name,
      users:users,
      isGroupChart:true,
      groupAddmin:req.user,
    });

    const fullGpChat=await Chat.findOne({_id:groupChat._id})
    .populate("users","-password")
    .populate("groupAddmin","-password");

    res.status(200).json(fullGpChat);

  } catch (error) {
    next(error)
  }

}

//create api for rename group chat

export const renameGroup=async(req,res,next)=>
{
  const { chatId,chartName }=req.body;

  const updateNamegp=await Chat.findByIdAndUpdate(
    chatId,
    {
      chartName
    },
    {
      new:true,
    }
  ).populate("users","-password")
  .populate("groupAddmin","-password");

  if(!updateNamegp)
  {
    return res.status(400).json({
      sucess:false,
      message:"Chat note found"
    })
  }
  else
  {
    res.json(updateNamegp)
  }

}

//create API for add to Group

export const addtoGroup=async(req,res,next)=>
{
  const { chatId,userId}=req.body;

  const adduser=await Chat.findByIdAndUpdate(chatId,{
    $push:{users:userId},
  },{
    new:true
  }).populate("users","-password")
  .populate("groupAddmin","-password");

  if(!adduser)
  {
    res.status(400).json({
      sucess:false,

      message:"Chat note found"
    })
  }
  else
  {
    res.json(adduser)
  }

}

// crate api for remove user from the group

export const removeUserGc=async(req,res,next)=>
{
  const { chatId,userId}=req.body;

  const removeUser=await Chat.findByIdAndUpdate(chatId,{
    $pull:{users:userId},
  },{
    new:true
  }).populate("users","-password")
  .populate("groupAddmin","-password");

  if(!removeUser)
  {
    res.status(400).json({
      sucess:false,

      message:"Chat note found"
    })
  }
  else
  {
    res.json(removeUser)
  }
}