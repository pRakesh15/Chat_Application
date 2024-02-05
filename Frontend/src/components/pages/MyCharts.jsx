import React, { useEffect, useState } from "react";

import { ChatState } from "../../Context/ChartProovider";
import { toast } from "react-toastify";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { IoIosAdd } from "react-icons/io";
import Loding from "../utilities/Loding";
import { server } from "../../main";
import axios from "axios";
import GroupChatModal from "../utilities/GroupChatModal";
import { getSender } from "../../../config/chatLogic";

function MyCharts({ fetchAgain }) {
  const [logedUser, setLogedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  //function for fetching chat for chatlistBox
  const fetchChat = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${server}/chart`, config);
      setChats(data);
      // setLodingChrt(false);

      onClose();
    } catch (error) {
      // // toast.error("Failed to connect to this user", {
      // //   position: "bottom-right",
      // //   theme: "colored",
      // });
      // setLodingChrt(false);
    }
    // console.log(chats)
  };

  useEffect(() => {
    setLogedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChat();
  }, [fetchAgain]);
  //showing the name for the chat eg: if rakesh send some message for appu then tha message is
  //box name is shown as appu from rakesh side and rakesh from appu side...
  // const getSender = (logedUser, users) => {
  //   return users[0]._id === logedUser._id
  //     ? users[1].username
  //     : users[0].username;
  // };

  return (
    <>
      <Box
        className={`  ${
          selectedChat ? "hidden" : "flex"
        } md:flex flex-col items-center p-3 bg-slate-300 w-full md:w-[31%] rounded-lg border-2`}
      >
        <Box className="pb-3 px-3 text-[28px] md:text-[30px]  flex w-[100%] justify-between items-center">
          My Chats
          <GroupChatModal>
            <Button
              className="flex text-[17px] md:text-[10px] lg:text-[17px]"
              rightIcon={<IoIosAdd />}
            >
              New Group Chat
            </Button>
          </GroupChatModal>
        </Box>
        <Box className="flex flex-col p-3 w-[100%] h-[100%] rounded-lg overflow-y-hidden">
          {chats ? (
            <Stack>
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  className="cursor-pointer px-3 py-2 rounded-lg bg-white"
                  key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChart
                      ? getSender(logedUser, chat.users)
                      : chat.chartName}
                  </Text>
                </Box>
              ))}
            </Stack>
          ) : (
            <Loding />
          )}
        </Box>
      </Box>
    </>
  );
}

export default MyCharts;
