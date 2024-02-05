import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";
import { ChatState } from "../../Context/ChartProovider";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../main";
import UserList from "./UserList";
import UserBadgeItem from "./UserBadgeItem";

function GroupChatModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatname, setGroupChatname] = useState();
  const [selectedUser, setSelectedUser] = useState([]);
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loding, setLoding] = useState();

  const { user, chats, setChats } = ChatState();

  //function for cearch user for aad to group
  const handelSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoding(true);

      const config = {
        headers: {
          // "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${server}/user?search=${search}`,
        config
      );
      setLoding(false);
      setSearchResult(data);
      // console.log(data);
    } catch (error) {
      toast.error("Failed to load the search results", {
        position: "bottom-right",
        theme: "colored",
      });
      setLoding(false);
    }
  };

  //function for craaete chat

  const createChat = async() => {
    if(!groupChatname ||!selectedUser)
    {
      toast.warn("plz fill all the fields !!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    try {
      setLoding(true);
      const config = {
        headers: {
          // "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `${server}/chart/group`,{
            name:groupChatname,
            users:JSON.stringify(selectedUser.map(u=>u._id)),
        },
        config
      );
      setChats([data,...chats]);
      onClose();
      toast.success("new Group is created", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      
    } catch (error) {
      toast.error("Unable to Create Chat", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  //functionn for select user for groupChat

  const selectUserForGroup = (userToAdd) => {
    if (selectedUser.includes(userToAdd)) {
      toast.warn("User alerady Added !!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setSelectedUser([...selectedUser, userToAdd]);
  };

  //function for remove user from the group

  const handelDelete = (deleteUser) => {
    setSelectedUser(selectedUser.filter((sel)=>sel._id!==deleteUser._id));
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-4xl flex justify-center">
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col items-center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                className="mb-3"
                onChange={(e) => setGroupChatname(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User eg: Sivani"
                className="mb-1"
                onChange={(e) => handelSearch(e.target.value)}
              />
            </FormControl>
            <Box className="w-[100%] flex ">
              {selectedUser.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handelFunction={() => handelDelete(user)}
                />
              ))}
            </Box>
            {loding ? (
              <div>Loding..</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserList
                    key={user._id}
                    user={user}
                    functionHendler={() => selectUserForGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={createChat}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModal;
