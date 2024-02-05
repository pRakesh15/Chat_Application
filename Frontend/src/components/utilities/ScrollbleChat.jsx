import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../../Context/ChartProovider";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../../../config/chatLogic";
import { Avatar, Tooltip } from "@chakra-ui/react";

function ScrollbleChat({ messages }) {
  const { user } = ChatState();
  // console.log(user._id)
  // console.log(messages)
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div className="flex" key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                label={m.sender.username}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  size="sm"
                  className="mt-[7px] mr-1  cursor-pointer"
                  name={m.sender.username}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#0CB577" : "#57C374"
                }`,
                marginLeft:isSameSenderMargin(messages,m,i,user._id),
                marginTop:isSameUser(messages,m,i)? 3 : 10,
              }}
              className="rounded-[20px] px-[15px] py-[5px] max-w-[75%]"
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
}

export default ScrollbleChat;
