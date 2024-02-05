import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChartProovider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import io from "socket.io-client";
import { IoArrowBackOutline } from "react-icons/io5";
import UpdateGroupChat from "./UpdateGroupChat";
import { getSender, getSenderFull } from "../../../config/chatLogic";
import ProfileModel from "./ProfileModel";
import { toast } from "react-toastify";
import { server } from "../../main";
import axios from "axios";
import ScrollbleChat from "./ScrollbleChat";
import "./global.css";
// import Lottie from 'react-lottie'
import animationData from '../../animations/typing.json'

const ENDPOINT = "http://127.0.0.1:1754";
var socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat ,notification,setNotification} = ChatState();
  const [message, setMessage] = useState([]);
  const [loding, setLoding] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState();
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  //function for fetch all chat

  const fetechMessage = async () => {
    // console.log(selectedChat)
    if (!selectedChat) return;
    try {
      setLoding(true);
      const config = {
        headers: {
          // "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${server}/message/${selectedChat._id}`,
        config
      );
      setMessage(data.message);
      setLoding(false);
      socket.emit("join chat", selectedChat._id);
      // console.log(message)
    } catch (error) {
      toast.error("Unable to fetchChat !!", {
        position: "bottom-right",
        theme: "colored",
      });
      setLoding(false);
    }
  };

  //function for send message
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing",selectedChat._id);
      try {
        setLoding(true);
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          `${server}/message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        socket.emit("new message", data.message);

        // console.log(data);
        setNewMessage("");
        setLoding(false);
        setMessage([...message, data.message]); //problem
        // console.log(message);
      } catch (error) {
        toast.error("Unable to send message !!", {
          position: "bottom-right",
          theme: "colored",
        });
        setLoding(false);
      }
    }
  };

  useEffect(() => {
    fetechMessage();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  //creating the socket.io functions

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  //function for send and recive message

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //give notification
        if(!notification.includes(newMessageRecieved))
        {
          setNotification([newMessageRecieved,...notification]);
          setFetchAgain(!fetchAgain);
        }

      } else {
        setMessage([...message, newMessageRecieved]);
      }
    });
  });

  const tyipingHendler = (e) => {
    setNewMessage(e.target.value);
    // console.log(newMessage);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
// const defaultOpction={
//   loop:true,
//   autoplay:true,
//   animationData: animationData,
//   rendererSettings:{
//     preserveAspectRatio:"xMidYMid slice",
//   },
// }

  return (
    <>
      {selectedChat ? (
        <>
          <Text className="text-[28px] md:text-[30px] pb-3 px-2 w-[100%] flex justify-center items-baseline">
            <IconButton
              className="flex md:hidden"
              icon={<IoArrowBackOutline />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChart ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chartName.toUpperCase()}
                <UpdateGroupChat
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMeessages={fetechMessage}
                />
              </>
            )}
          </Text>
          <Box className="flex flex-col justify-end p-3 bg-slate-400 w-[100%] h-[100%] rounded-lg overflow-hidden hide">
            {loding ? (
              <Spinner className=" w-20 h-20 self-center m-auto" />
            ) : (
              <div className="message">
                <ScrollbleChat messages={message} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
            {isTyping?<div>
              typing...
              </div>:<></>}
              <Input
                variant="filled"
                className="bg-[#E0E0E0]"
                placeholder="Enter message"
                onChange={tyipingHendler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box className="flex items-center justify-center h-[100%]">
          <Text className="text-3xl pb-3">Select User To Chat!!!</Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
