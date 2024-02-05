import { Chat } from "../models/chartsModel.js";
import { User } from "../models/userModel.js";
import { Message } from "../models/messageModel.js";

//function for send message

export const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    return res.status(400).json({
      success: false,
      message: "invalide data into requst",
    });
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "username pic email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.status(200).json({
      success: true,
      message: message,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

//function for fetching all message for a poticular chat

export const allMessage = async (req, res) => {
  try {
    const messsage = await Message.find({ chat: req.params.chatId })
      .populate("sender", "usernameaaa pic email")
      .populate("chat");
    // console.log(messsage);
    res.status(200).json({
      success: true,
      message: messsage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: Error.message, 
    });
    // throw new Error(error.message);
  }
};
