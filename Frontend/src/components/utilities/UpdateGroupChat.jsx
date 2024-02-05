import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { ChatState } from "../../Context/ChartProovider";
import UserBadgeItem from "./UserBadgeItem";
import { toast } from "react-toastify";
import { server } from "../../main";
import axios from "axios";
import UserList from "./UserList";

function UpdateGroupChat({ fetchAgain, setFetchAgain,fetchMeessages }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [groupChatname, setGroupChatname] = useState();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loding, setLoding] = useState(false);
  const [renameloding, setRenameloding] = useState(false);

  //function for remove user from group
  const handelRemove = async(user1) => {
    if(selectedChat.groupAddmin._id !== user._id && user1._id !==user._id)
    {
      toast.error("only admin can remove !!", {
          position: "bottom-right",
          theme: "colored",
        });
        return;
    }

    try {
      setLoding(true)
      const config = {
          headers: {
            // "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.put(
          `${server}/chart/removeUser`,
          {
              chatId:selectedChat._id,
              userId:user1._id
          },
          config
        );
        user1._id===user._id?setSelectedChat():setSelectedChat(data);
        setLoding(false);
        setFetchAgain(!fetchAgain);
        fetchMeessages();
      
    } catch (error) {
      toast.error("Unable to remove user !!", {
          position: "bottom-right",
          theme: "colored",
        });
        setLoding(false);
    }
  };

  //function for rename the groupname
  const hendelRename = async () => {
    if (!groupChatname) return;

    try {
      setRenameloding(true);
      const config = {
        headers: {
          // "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `${server}/chart/rename`,
        {
            chatId:selectedChat._id,
            chartName:groupChatname,
        },
        config
      );
     
    setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      setRenameloding(false);
      
      
    } catch (error) {
      toast.error("Failed to rename group", {
        position: "bottom-right",
        theme: "colored",
      });
      setRenameloding(false);
    }
    setGroupChatname("");
  };

  //function for search user
  const handelSearch =async (query) => {
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
    //   console.log(data);
    } catch (error) {
      toast.error("Failed to load the search results", {
        position: "bottom-right",
        theme: "colored",
      });
      setLoding(false);
    }
  };

  //function fot add user
  const handelAddUser=async(user1)=>
  {
      if(selectedChat.users.find((u)=>u._id===user1._id))
      {
        toast.error("user alredy in group!!", {
            position: "bottom-right",
            theme: "colored",
          });
          return;
      }
      if(selectedChat.groupAddmin._id !== user._id)
      {
        toast.error("only admin can add !!", {
            position: "bottom-right",
            theme: "colored",
          });
          return;
      }

      try {
        setLoding(true)
        const config = {
            headers: {
              // "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `${server}/chart/addUser`,
            {
                chatId:selectedChat._id,
                userId:user1._id
            },
            config
          );
          setLoding(false);
          setSelectedChat(data);
          setFetchAgain(!fetchAgain);

        
      } catch (error) {
        toast.error("Unable to add user !!", {
            position: "bottom-right",
            theme: "colored",
          });
          setLoding(false);
      }

  }

  return (
    <>
      <IconButton onClick={onOpen} className="flex" icon={<FaEye />} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-gray-950 text-4xl  flex justify-center">
            {selectedChat.chartName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box className="w-[100%] flex flex-wrap pb-3">
              {selectedChat.users.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handelFunction={() => handelRemove(user)}
                />
              ))}
            </Box>
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatname}
                onChange={(e) => setGroupChatname(e.target.value)}
              />
              <Button
                variant="ghost"
                className="ml-1 bg-green-500"
                isLoading={renameloding}
                onClick={hendelRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handelSearch(e.target.value)}
              />
            </FormControl>
            {
                loding?(<Spinner size="lg"/>):(
                    searchResult?.map((user)=>(
                        <UserList
                        key={user._id}
                        user={user}
                        functionHendler={handelAddUser(user)}/>
                    ))
                )
            }
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              className="bg-red-600"
              onClick={() => handelRemove(user)}
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateGroupChat;
