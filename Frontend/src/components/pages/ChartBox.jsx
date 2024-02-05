import React from "react";
import { ChatState } from "../../Context/ChartProovider";
import { Box } from "@chakra-ui/react";
import SingleChat from "../utilities/SingleChat";
function ChartBox({fetchAgain,setFetchAgain}) {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  return (
    <>
      <Box
        className={` ${
          selectedChat ? "hidden" : "flex"
        } md:flex items-center flex-col p-3 bg-white w-[100%] md:w-[68%] rounded-lg border-[1px]`}
      >
       <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
      </Box>
    </>
  );
}

export default ChartBox;
