import { Box } from "@chakra-ui/react";
import React from "react";
import { IoIosClose } from "react-icons/io";


function UserBadgeItem({ user, handelFunction }) {
  return (
    <>
      <Box
        className="px-2 py-1 rounded-lg m-1 mb-2 text-xl bg-purple-700 cursor-pointer flex text-white"
        onClick={handelFunction}
      >
      {user.username}
      <IoIosClose className="pl-1 text-xl mt-1" />
      </Box>
    </>
  );
}

export default UserBadgeItem;
